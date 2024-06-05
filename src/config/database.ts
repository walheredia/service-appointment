import dotenv from 'dotenv';
import odbc from 'odbc';
import { Sequelize } from 'sequelize';

dotenv.config();

const dsnName = process.env.dsnName;
const uid = process.env.dsnUser;
const pwd = process.env.dsnPass;
let connection: odbc.Connection;
/*
export async function connectToDatabase() {
  try {
    // Conectar utilizando el DSN, usuario y contraseña
    connection = await odbc.connect(`DSN=${dsnName};UID=${uid};PWD=${pwd}`);
    
    console.log('Conexión exitosa al DSN:', dsnName);
    return connection;
  } catch (error) {
    console.error('Error al conectar al DSN:', error);
    throw error;
  }
}

export function getDatabaseConnection(): odbc.Connection {
  if (!connection) {
    throw new Error("The database connection has not been initialized.");
  }

  return connection;
}
*/
const sequelize = new Sequelize({
  dialect: 'mssql', // Asumiendo que estás usando SQL Server
  dialectOptions: {
    options: {
      encrypt: true
    },
    driver: 'ODBC Driver 17 for SQL Server',
    connectionString: `DSN=${dsnName};UID=${uid};PWD=${pwd}`
  },
  logging: false // Desactivar logging de Sequelize
});

export default sequelize;