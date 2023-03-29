import { DataTypes } from "sequelize"
import sequelize from "../config"

export const StateLog = sequelize.define(
    "stateLog",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        tableName: "stateLogs",
    }
)
