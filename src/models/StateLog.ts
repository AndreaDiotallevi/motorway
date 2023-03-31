import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize"
import sequelize from "../configs/sequelize"

export class StateLog extends Model<InferAttributes<StateLog>, InferCreationAttributes<StateLog>> {
    declare id: number
    declare vehicleId: number
    declare state: string
    declare timestamp: string
}

StateLog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        sequelize: sequelize,
        tableName: "stateLogs",
    }
)
