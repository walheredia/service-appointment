import dotenv from 'dotenv';
import odbc from 'odbc';

dotenv.config();

const dsnGeneralName = process.env.dsnGeneralName;
const uidGeneral = process.env.dsnGeneralUser;
const pwdGeneral = process.env.dsnGeneralPass;

const dsnServicesName = process.env.dsnServicesName;
const uidServices = process.env.dsnServicesUser;
const pwdServices = process.env.dsnServicesPass;

let generalConnection: odbc.Connection;
let servicesConnection: odbc.Connection;

export async function connectToGeneralDatabase() {
  try {
    //Connect to General DB
    generalConnection = await odbc.connect(`DSN=${dsnGeneralName};UID=${uidGeneral};PWD=${pwdGeneral}`);
    console.log('Conexión exitosa al DSN:', dsnGeneralName);
    return generalConnection;
  } catch (error) {
    console.error('Error al conectar al DSN General:', error);
    throw error;
  }
}

export function getGeneralDatabaseConnection(): odbc.Connection {
  if (!generalConnection) {
    throw new Error('The database connection (General) has not been initialized.');
  }
  return generalConnection;
}

export async function connectToServicesDatabase() {
  try {
    //Connect to Services DB
    servicesConnection = await odbc.connect(`DSN=${dsnServicesName};UID=${uidServices};PWD=${pwdServices}`);
    console.log('Conexión exitosa al DSN:', dsnServicesName);
    return servicesConnection;
  } catch (error) {
    console.error('Error al conectar al DSN Services:', error);
    throw error;
  }
}

export function getServicesConnection(): odbc.Connection {
  if (!servicesConnection) {
    throw new Error('The database connection (Services) has not been initialized.');
  }
  return servicesConnection;
}

