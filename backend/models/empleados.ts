import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IEmpleado extends Document {
  id: number;
  nombre: string;
  puesto: string;
  empresa: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const empleadoSchema = new Schema<IEmpleado>({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  nombre: {
    type: String,
    required: true,
    match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
  },
  puesto: {
    type: String,
    required: true
  },
  empresa: {
    type: Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  }
}, { timestamps: true });

export const Empleado = mongoose.model<IEmpleado>('Empleado', empleadoSchema);
