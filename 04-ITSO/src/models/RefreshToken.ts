import {Model, DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize) => {
    
    class RefreshToken extends Model {
        static associate(models: any) {
            RefreshToken.belongsTo(models["User"]);
        }
    }

    RefreshToken.init({
        token: {
            type: DataTypes.TEXT
        }
    }, {
        sequelize,
        modelName: "RefreshToken"
    });

    return RefreshToken;
}