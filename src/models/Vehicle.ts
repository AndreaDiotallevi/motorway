import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../configs/sequelize"

interface VehicleAttributes {
    id: number
    make: string
    model: string
    state: string
}

export interface VehicleInput extends Optional<VehicleAttributes, "id" | "make" | "model" | "state"> {}
export interface VehicleOuput extends Required<VehicleAttributes> {}

export class Vehicle extends Model<VehicleAttributes, VehicleInput> implements VehicleAttributes {
    public id!: number
    public make!: string
    public model!: string
    public state!: string
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
