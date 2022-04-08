import { DataTypes, Model, Sequelize } from "sequelize";
import PasswordUtils from "../utils/PasswordUtils";

export default (sequelize: Sequelize) => {

    class User extends Model{
        static associate(models: any){}
    }

    User.init({
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {isEmail: true}
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING(50),
            unique: true
        },
        firstName: {
            type: DataTypes.STRING(50),
            validate: {
                len: {args: [0,50], msg: ""}
            }
        },
        laststName: {
            type: DataTypes.STRING(50),
            validate: {
                len: {args: [0,50], msg: ""}
            }
        }
    }, {
        sequelize,
        modelName: "User",
        indexes: [{unique: true, fields: ["email"]}]
    });

    User.beforeSave(async (user: any, options) => {
        const hashedPassword = await PasswordUtils.hashPassword(user.password);
        user.password = hashedPassword;
    });

    return User;
}