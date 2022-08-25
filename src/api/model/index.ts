import { DataTypes, Model, Sequelize } from "sequelize";
import db from '../../config/database.config';

interface userAttributes {
	id: string;
	firstName: string;
	surname: string;
    email: string;
    phone: string;
    gender: string;
    dob: Date;
    about: string;
}

export class UserInstance extends Model<userAttributes> {}

UserInstance.init(
    {
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3, 20]
			},
		},
		surname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3, 20]
			},
		},
        email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
            validate: { isEmail: true },
		},
        gender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        phone: {
			type: DataTypes.STRING,
			allowNull: false
		},
        dob: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: { isDate: true }
		},
        about: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize: db,
		tableName: 'users',
	}
)