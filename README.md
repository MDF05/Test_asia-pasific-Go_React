# ASIA_PACIFIC_GO_REACT
# MUHAMMAD DAVA FAHREZA 

REST API 

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   npm install --save-dev @types/node @types/express @types/multer @types/uuid
   ```
2. **Jalankan server:**
   ```sh
   npx ts-node src/app.ts
   ```

## Endpoint Utama

- `POST   /api/clients`      → Create client (form-data, field: client_logo)
- `GET    /api/clients`      → Get all clients
- `GET    /api/clients/:id`  → Get client by id
- `PUT    /api/clients/:id`  → Update client (form-data, field: client_logo)
- `DELETE /api/clients/:id`  → Soft delete client

