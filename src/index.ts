import app from './app';
import dotenv from 'dotenv';
import { connectToGeneralDatabase, connectToServicesDatabase } from './config/database';

dotenv.config();

const port = process.env.PORT || 3000;

async function main() {
  try {
    const generalConnection = await connectToGeneralDatabase();
    const servicesConnection = await connectToServicesDatabase();
    
    // Close db connection
    //await generalConnection.close();
    //await servicesConnection.close();
  } catch (error) {
    console.error('Error al conectar al DSN:', error);
  }
}


app.listen(port, () => {
  main();
  console.log(`Server is running on port ${port}`);
});
