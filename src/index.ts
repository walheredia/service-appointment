import app from './app';
import dotenv from 'dotenv';
import sequelize from './config/database';

dotenv.config();

const port = process.env.PORT || 3000;

async function main() {
  try {
    const connection = sequelize.authenticate();
    //await sequelize.authenticate();
    
    // Cierra la conexión 
    //await sequelize.close();
    //await connection.close();
  } catch (error) {
    console.error('Error al conectar al DSN:', error);
  }
}


app.listen(port, () => {
  main();
  console.log(`Server is running on port ${port}`);
});
