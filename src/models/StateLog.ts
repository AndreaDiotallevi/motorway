import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../configs/sequelize"

interface StateLogAttributes {
    id: number
    vehicleId: number
    state: string
    timestamp: string
}

export interface StateLogInput
    extends Optional<StateLogAttributes, "id" | "vehicleId" | "state" | "timestamp"> {}
export interface StateLogsOuput extends Required<StateLogAttributes> {}

export class StateLog extends Model<StateLogAttributes, StateLogInput> implements StateLogAttributes {
    public id!: number
    public vehicleId!: number
    public state!: string
    public timestamp!: string
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
