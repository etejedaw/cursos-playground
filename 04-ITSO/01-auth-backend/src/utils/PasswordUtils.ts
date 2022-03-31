import bcrypt from "bcrypt";
import environment from "../config/environment";

class PasswordUtils {

    static async hashPassword(password: string){
        return bcrypt.hash(password, environment.SALT_ROUNDS);
    }

    static async comparePasswords(password: string, hashedPassword: string){
        return bcrypt.compare(password, hashedPassword);
    }

}

export default PasswordUtils;