import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const dbConnection = async (): Promise<void> => {
  try {
    const uri = (process.env.MONGODB_URI as string) + (process.env.MONGODB_DB as string);
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB Atlas');
  } catch (error: unknown) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};
