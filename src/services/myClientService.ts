import pool from '../utils/db';
import { MyClient } from '../models/myClientModel';

export const createClient = async (data: MyClient): Promise<MyClient> => {
  const result = await pool.query(
    `INSERT INTO my_client (name, slug, is_project, self_capture, client_prefix, client_logo, address, phone_number, city, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, NOW(), NOW()) RETURNING *`,
    [data.name, data.slug, data.is_project, data.self_capture, data.client_prefix, data.client_logo, data.address, data.phone_number, data.city]
  );
  return result.rows[0];
};

export const getAllClients = async (): Promise<MyClient[]> => {
  const result = await pool.query('SELECT * FROM my_client WHERE deleted_at IS NULL ORDER BY id DESC');
  return result.rows;
};

export const getClientById = async (id: number): Promise<MyClient | null> => {
  const result = await pool.query('SELECT * FROM my_client WHERE id = $1 AND deleted_at IS NULL', [id]);
  return result.rows[0] || null;
};

export const updateClient = async (id: number, data: Partial<MyClient>): Promise<MyClient | null> => {
  const result = await pool.query(
    `UPDATE my_client SET name=$1, slug=$2, is_project=$3, self_capture=$4, client_prefix=$5, client_logo=$6, address=$7, phone_number=$8, city=$9, updated_at=NOW() WHERE id=$10 AND deleted_at IS NULL RETURNING *`,
    [data.name, data.slug, data.is_project, data.self_capture, data.client_prefix, data.client_logo, data.address, data.phone_number, data.city, id]
  );
  return result.rows[0] || null;
};

export const softDeleteClient = async (id: number): Promise<boolean> => {
  const result = await pool.query(
    'UPDATE my_client SET deleted_at=NOW() WHERE id=$1 AND deleted_at IS NULL RETURNING id',
    [id]
  );
  return !!result.rows[0];
}; 