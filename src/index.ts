import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json("api is alive")
});

app.get('/', (req, res) => {
  res.json("api is alive")
});

async function main() {
  try {
    const connection = await connectToDatabase();

    
    // Cierra la conexión
    await connection.close();
  } catch (error) {
    console.error('Error al conectar al DSN:', error);
  }
}


app.listen(port, () => {
  main();
  console.log(`Server is running on port ${port}`);
});
