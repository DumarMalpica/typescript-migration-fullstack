import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, User, Lock, AlertCircle, Clipboard, ArrowRight, Key, ShieldCheck, Undo2 } from 'lucide-react';

type LoginStep = 1 | 2 | 3;

export default function Login() {
  const { login, setManualToken } = useAuth();

  const [step, setStep] = useState<LoginStep>(1);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [generatedToken, setGeneratedToken] = useState<string>('');
  const [pastedToken, setPastedToken] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCredentialsSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { success, token, message } = await login(username, password);
    if (success && token) {
      setGeneratedToken(token);
      setStep(2);
    } else {
      setError(message || 'Error desconocido');
    }
    setIsLoading(false);
  };

  const handleManualAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, message } = setManualToken(pastedToken);
    if (!success) {
      setError(message || 'Error desconocido');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedToken);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDemoFill = (type: string) => {
    if (type === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('user');
      setPassword('user123');
    }
  };

  const resetForm = () => {
    setStep(1);
    setError(null);
    setGeneratedToken('');
    setPastedToken('');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%', padding: '20px' }}>
      <div className="glass-panel animate-enter" style={{ width: '100%', maxWidth: '400px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--clr-primary)', borderRadius: '50%', display: 'inline-flex', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
              {step === 1 && <LogIn color="white" size={32} />}
              {step === 2 && <Key color="white" size={32} />}
              {step === 3 && <ShieldCheck color="white" size={32} />}
            </div>
          </div>
          <h2 style={{ marginBottom: '0.5rem' }}>
            {step === 1 && 'Bienvenido'}
            {step === 2 && 'Token Generado'}
            {step === 3 && 'Verificación'}
          </h2>
          <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>
            {step === 1 && 'Inicia sesión para obtener tu token'}
            {step === 2 && 'Copia este token JWT para continuar'}
            {step === 3 && 'Pega tu token para entrar al panel'}
          </p>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--clr-danger)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Credentials */}
        {step === 1 && (
          <form onSubmit={handleCredentialsSubmit}>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <span style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--clr-text-muted)' }}>
                <User size={18} />
              </span>
              <input
                type="text" className="input-field" placeholder="Usuario"
                style={{ paddingLeft: '2.5rem', marginBottom: 0 }}
                value={username} onChange={(e) => setUsername(e.target.value)} required
              />
            </div>

            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <span style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--clr-text-muted)' }}>
                <Lock size={18} />
              </span>
              <input
                type="password" className="input-field" placeholder="Contraseña"
                style={{ paddingLeft: '2.5rem', marginBottom: 0 }}
                value={password} onChange={(e) => setPassword(e.target.value)} required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
              {isLoading ? 'Autenticando...' : 'Obtener Token'}
            </button>
          </form>
        )}

        {/* Step 2: Show Token */}
        {step === 2 && (
          <div className="animate-enter">
            <div style={{ background: 'var(--clr-bg-base)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--clr-bg-elevated)', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--clr-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>JSON Web Token (JWT)</p>
              <div style={{ maxHeight: '120px', overflowY: 'auto', fontSize: '0.75rem', fontFamily: 'monospace', wordBreak: 'break-all', color: 'var(--clr-primary)', lineHeight: 1.4 }}>
                {generatedToken}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={copyToClipboard} className="btn" style={{ flex: 1, background: isCopied ? 'var(--clr-success)' : 'var(--clr-bg-elevated)' }}>
                {isCopied ? '¡Copiado!' : <><Clipboard size={18} /> Copiar</>}
              </button>
              <button onClick={() => setStep(3)} className="btn btn-primary" style={{ flex: 1.2 }}>
                Continuar <ArrowRight size={18} />
              </button>
            </div>

            <button onClick={resetForm} className="btn" style={{ width: '100%', marginTop: '1rem', background: 'transparent', color: 'var(--clr-text-muted)', fontSize: '0.8rem' }}>
              <Undo2 size={14} /> Volver a Inicio de Sesión
            </button>
          </div>
        )}

        {/* Step 3: Paste Token */}
        {step === 3 && (
          <form onSubmit={handleManualAuth} className="animate-enter">
            <textarea
              className="input-field"
              placeholder="Pega tu token aquí..."
              rows={5}
              style={{ fontFamily: 'monospace', fontSize: '0.8rem', resize: 'none', marginBottom: '1.5rem' }}
              value={pastedToken}
              onChange={(e) => setPastedToken(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Validar y Acceder al Panel
            </button>

            <button type="button" onClick={() => setStep(2)} className="btn" style={{ width: '100%', marginTop: '1rem', background: 'transparent', color: 'var(--clr-text-muted)', fontSize: '0.8rem' }}>
               <Undo2 size={14} /> Volver a ver el Token
            </button>
          </form>
        )}

        {/* Demo Footer (only step 1) */}
        {step === 1 && (
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--clr-bg-elevated)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', textAlign: 'center', marginBottom: '1rem' }}>O usar credenciales de prueba</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="button" onClick={() => handleDemoFill('admin')} className="btn" style={{ flex: 1, background: 'var(--clr-bg-elevated)', color: 'var(--clr-text-main)', fontSize: '0.8rem', padding: '0.5rem' }}>Demo Admin</button>
              <button type="button" onClick={() => handleDemoFill('user')} className="btn" style={{ flex: 1, background: 'var(--clr-bg-elevated)', color: 'var(--clr-text-main)', fontSize: '0.8rem', padding: '0.5rem' }}>Demo Usuario</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
