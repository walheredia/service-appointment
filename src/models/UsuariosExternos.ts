import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsuariosExternosAttributes {
  Id: number;
  Username: string;
  EMail?: string;
  PasswordHash?: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt?: Date;
}

interface UsuariosExternosCreationAttributes extends Optional<UsuariosExternosAttributes, 'Id' | 'CreatedAt' | 'UpdatedAt'> {}

class UsuariosExternos extends Model<UsuariosExternosAttributes, UsuariosExternosCreationAttributes> implements UsuariosExternosAttributes {
  public Id!: number;
  public Username!: string;
  public EMail?: string;
  public PasswordHash?: string;
  public CreatedAt!: Date;
  public UpdatedAt!: Date;
  public DeletedAt?: Date;
}

//const dbConnection = getDatabaseConnection();

UsuariosExternos.init({
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  Username: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  EMail: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  PasswordHash: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  CreatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  UpdatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  DeletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'UsuariosExternos',
  timestamps: false,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt',
  deletedAt: 'DeletedAt'
});

export default UsuariosExternos;
