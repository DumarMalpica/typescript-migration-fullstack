import { Request, Response } from 'express';
import { Empleado } from '../models/empleados.js';
import { Empresa } from '../models/empresa.js';
import { Types } from 'mongoose';

const resolverEmpresa = async (empresaInput: string | number): Promise<Types.ObjectId> => {
  const empresa = await Empresa.findOne({ id: Number(empresaInput) });
  if (!empresa) {
    throw new Error(`No existe ninguna empresa con id ${empresaInput}. Debes crear la empresa primero.`);
  }
  return empresa._id as Types.ObjectId;
};

export const getAll = async (req: Request, res: Response): Promise<any> => {
  try {
    const empleados = await Empleado.find({}).populate('empresa', 'id nombre telefono');
    return res.status(200).json({ state: true, data: empleados });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error';
    return res.status(500).json({ state: false, msg });
  }
};

export const getById = async (req: Request, res: Response): Promise<any> => {
  try {
    const empleado = await Empleado.findOne({ id: Number(req.params.id) })
      .populate('empresa', 'id nombre telefono');
    if (!empleado) {
      return res.status(404).json({ state: false, msg: 'Empleado no encontrado' });
    }
    return res.status(200).json({ state: true, data: empleado });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error';
    return res.status(500).json({ state: false, msg });
  }
};

export const save = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = { ...req.body };

    if (!body.empresa) {
      return res.status(400).json({
        state: false,
        msg: 'El campo empresa es obligatorio. Crea primero una empresa y pasa su id numérico aquí.'
      });
    }

    body.empresa = await resolverEmpresa(body.empresa);

    const empleado = new Empleado(body);
    const resultado = await empleado.save();
    const poblado = await resultado.populate('empresa', 'id nombre telefono');
    return res.status(201).json({ state: true, data: poblado });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error';
    return res.status(400).json({ state: false, msg });
  }
};

export const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = { ...req.body };

    if (body.empresa !== undefined) {
      if (!body.empresa) {
        return res.status(400).json({
          state: false,
          msg: 'El campo empresa no puede estar vacío.'
        });
      }
      body.empresa = await resolverEmpresa(body.empresa);
    }

    const empleado = await Empleado.findOneAndUpdate(
      { id: Number(req.params.id) },
      body,
      { new: true, runValidators: true }
    ).populate('empresa', 'id nombre telefono');

    if (!empleado) {
      return res.status(404).json({ state: false, msg: 'Empleado no encontrado' });
    }
    return res.status(200).json({ state: true, data: empleado });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error';
    return res.status(400).json({ state: false, msg });
  }
};

export const remove = async (req: Request, res: Response): Promise<any> => {
  try {
    const empleado = await Empleado.findOneAndDelete({ id: Number(req.params.id) });
    if (!empleado) {
      return res.status(404).json({ state: false, msg: 'Empleado no encontrado' });
    }
    return res.status(200).json({ state: true, msg: 'Empleado eliminado correctamente' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error';
    return res.status(500).json({ state: false, msg });
  }
};
