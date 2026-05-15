import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface AuthUser extends JwtPayload {
  username: string;
  role: 'admin' | 'user';
  sub: number;
}

interface LoginResult {
  success: boolean;
  token?: string;
  message?: string;
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  setManualToken: (token: string) => LoginResult;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<AuthUser>(token);
                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser(decoded);
                    localStorage.setItem('token', token);
                }
            } catch (err) {
                console.error("Invalid token:", err);
                logout();
            }
        } else {
            setUser(null);
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = async (username: string, password: string): Promise<LoginResult> => {
        try {
            const isProd = window.location.hostname.includes('vercel.app');
            const RENDER_URL = 'https://taller-api-rest-mom1.onrender.com';
            const API_URL = isProd ? RENDER_URL : (import.meta.env.VITE_API_URL || 'http://localhost:3000');

            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (response.ok && data.state) {
                return { success: true, token: data.token };
            } else {
                return { success: false, message: data.msg || 'Fallo al iniciar sesión' };
            }
        } catch (error) {
            console.error("Login connection error:", error);
            return {
                success: false,
                message: 'El servidor está iniciando (estado de hibernación). Por favor espera 30 segundos y vuelve a intentar.'
            };
        }
    };

    const setManualToken = (manualToken: string): LoginResult => {
        try {
            jwtDecode(manualToken);
            setToken(manualToken);
            return { success: true };
        } catch (err) {
            return { success: false, message: 'Formato de Token JWT inválido' };
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, setManualToken }}>
            {children}
        </AuthContext.Provider>
    );
};
