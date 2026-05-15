import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { dbConnection } from './drivers/connect-db.js';
import { swaggerSpec } from './swagger.js';
import routesAuth from './routes/routes-auth.js';
import routesEmpresa from './routes/routes-empresa.js';
import routesEmpleados from './routes/routes-empleados.js';

dotenv.config();

const app: Application = express();
app.use(cors());
const PORT: string | number = process.env.PORT || 3000;

dbConnection();

app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', routesAuth);
app.use('/api/empresas', routesEmpresa);
app.use('/api/empleados', routesEmpleados);

app.get('/ping', (req, res) => res.json({ state: true, msg: 'pong' }));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger UI disponible en http://localhost:${PORT}/api/docs`);
});
