import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const dsnName = process.env.dsnName;
const uid = process.env.dsnUser;
const pwd = process.env.dsnPass;

const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    connectionString: `DSN=${dsnName};UID=${uid};PWD=${pwd}`,
  },
  logging: false, // Desactivar logging de Sequelize
});

export default sequelize;
