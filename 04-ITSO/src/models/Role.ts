import { Model, DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
        
    class Role extends Model {
        static associate(models: any){
            Role.belongsTo(models["User"]);
        }
    }

    Role.init({
        role: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: "Role"
    });

    return Role
}