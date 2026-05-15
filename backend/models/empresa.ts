import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IEmpresa extends Document {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  createdAt: Date;
  updatedAt: Date;
}

const empresaSchema = new Schema<IEmpresa>({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true,
    match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
  },
  direccion: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Empresa = mongoose.model<IEmpresa>('Empresa', empresaSchema);
