import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize"
import sequelize from "../configs/sequelize"

export class Vehicle extends Model<InferAttributes<Vehicle>, InferCreationAttributes<Vehicle>> {
    declare id: number
    declare make: string
    declare model: string
    declare state: string
}

Vehicle.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        make: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        sequelize: sequelize,
        tableName: "vehicles",
    }
)
