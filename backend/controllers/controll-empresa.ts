import { Request, Response } from 'express';
import { Empresa } from '../models/empresa.js';

export const getAll = async (req: Request, res: Response): Promise<any> => {
  try {
    const empresas = await Empresa.find({});
    return res.status(200).json({ state: true, data: empresas });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error';
    return res.status(500).json({ state: false, msg });
  }
};

export const getById = async (req: Request, res: Response): Promise<any> => {
  try {
    const empresa = await Empresa.findOne({ id: Number(req.params.id) });
    if (!empresa) {
      return res.status(404).json({ state: false, msg: 'Empresa no encontrada' });
    }
    return res.status(200).json({ state: true, data: empresa });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error';
    return res.status(500).json({ state: false, msg });
  }
};

export const save = async (req: Request, res: Response): Promise<any> => {
  try {
    const empresa = new Empresa(req.body);
    const resultado = await empresa.save();
    return res.status(201).json({ state: true, data: resultado });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error';
    return res.status(400).json({ state: false, msg });
  }
};

export const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const empresa = await Empresa.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!empresa) {
      return res.status(404).json({ state: false, msg: 'Empresa no encontrada' });
    }
    return res.status(200).json({ state: true, data: empresa });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error';
    return res.status(400).json({ state: false, msg });
  }
};

export const remove = async (req: Request, res: Response): Promise<any> => {
  try {
    const empresa = await Empresa.findOneAndDelete({ id: Number(req.params.id) });
    if (!empresa) {
      return res.status(404).json({ state: false, msg: 'Empresa no encontrada' });
    }
    return res.status(200).json({ state: true, msg: 'Empresa eliminada correctamente' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error';
    return res.status(500).json({ state: false, msg });
  }
};
