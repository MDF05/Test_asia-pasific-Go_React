import { Request, Response } from 'express';
import * as myClientService from '../services/myClientService';
import s3 from '../utils/s3';
import redisClient from '../utils/redis';
import { v4 as uuidv4 } from 'uuid';

const S3_BUCKET = process.env.AWS_S3_BUCKET || '';

async function uploadToS3(file: Express.Multer.File): Promise<string> {
  const key = `client-logos/${uuidv4()}-${file.originalname}`;
  await s3
    .upload({
      Bucket: S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    })
    .promise();
  return `https://${S3_BUCKET}.s3.amazonaws.com/${key}`;
}

export const create = async (req: Request, res: Response) => {
  try {
    let client_logo_url = req.body.client_logo;
    if (req.file) {
      client_logo_url = await uploadToS3(req.file);
    }
    const data = { ...req.body, client_logo: client_logo_url };
    const client = await myClientService.createClient(data);
    await redisClient.set(client.slug, JSON.stringify(client));
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create client', details: err });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const clients = await myClientService.getAllClients();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch clients', details: err });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const client = await myClientService.getClientById(Number(req.params.id));
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch client', details: err });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    if (req.body.slug) {
      await redisClient.del(req.body.slug);
    }
    let client_logo_url = req.body.client_logo;
    if (req.file) {
      client_logo_url = await uploadToS3(req.file);
    }
    const data = { ...req.body, client_logo: client_logo_url };
    const client = await myClientService.updateClient(Number(req.params.id), data);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    await redisClient.set(client.slug, JSON.stringify(client));
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update client', details: err });
  }
};

export const softDelete = async (req: Request, res: Response) => {
  try {
    const client = await myClientService.getClientById(Number(req.params.id));
    if (client) {
      await redisClient.del(client.slug);
    }
    const deleted = await myClientService.softDeleteClient(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Client not found' });
    res.json({ message: 'Client soft deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete client', details: err });
  }
}; 