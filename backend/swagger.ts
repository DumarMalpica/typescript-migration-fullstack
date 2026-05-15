import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API RESTFul - Empresas & Empleados',
    version: '1.0.0',
    description: 'API RESTFul construida con Node.js, Express y MongoDB. Gestiona Empresas y Empleados con seguridad JWT.',
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html'
    },
    contact: {
      name: 'Taller Electiva II - UPTC',
      url: 'https://uptc.edu.co'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desarrollo'
    },
    {
      url: 'https://taller-api-rest-mom1.onrender.com',
      description: 'Servidor en la Nube (Render)'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingresa el token JWT obtenido desde /api/auth/login'
      }
    },
    schemas: {
      Empresa: {
        type: 'object',
        required: ['id', 'nombre', 'direccion', 'telefono'],
        properties: {
          id: { type: 'integer', example: 1, description: 'ID único de la empresa' },
          nombre: { type: 'string', example: 'Tech Corp', description: 'Nombre (solo letras y espacios)' },
          direccion: { type: 'string', example: 'Calle 10 #5-20', description: 'Dirección de la empresa' },
          telefono: { type: 'string', example: '6017654321', description: 'Teléfono de contacto' }
        }
      },
      Empleado: {
        type: 'object',
        required: ['id', 'nombre', 'puesto', 'empresa'],
        properties: {
          id: { type: 'integer', example: 101, description: 'ID único del empleado' },
          nombre: { type: 'string', example: 'Juan Pérez', description: 'Nombre del empleado' },
          puesto: { type: 'string', example: 'Desarrollador Senior', description: 'Cargo o puesto' },
          empresa: { type: 'string', example: '65f1a2b3c4d5e6f7a8b9c0d1', description: 'ObjectId de la empresa' }
        }
      },
      LoginRequest: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', example: 'usuario' },
          password: { type: 'string', example: 'contraseña' }
        }
      },
      LoginResponse: {
        type: 'object',
        properties: {
          state: { type: 'boolean', example: true },
          msg: { type: 'string', example: 'Login exitoso' },
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          state: { type: 'boolean', example: false },
          msg: { type: 'string', example: 'Mensaje de error' }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);
