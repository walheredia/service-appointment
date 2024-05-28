import express from 'express';
import dotenv from 'dotenv';
//import sequelize from './config/database';
import odbc from 'odbc';
const dsnName = 'dsnEventos';
const uid = 'juan';
const pwd = '5871';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function main() {
  try {
    // Conectar utilizando el DSN, usuario y contraseña
    const connection = await odbc.connect(`DSN=${dsnName};UID=${uid};PWD=${pwd}`);
    
    console.log('Conexión exitosa al DSN:', dsnName);

    // Realiza operaciones en la base de datos utilizando la conexión

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
