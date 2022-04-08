import PasswordUtils from "../../src/utils/PasswordUtils";

describe('PasswordUtils', () => {
    describe('static methods', () => {
        describe("hashPassword", () => {
            it("shoud encrypt the password correctly", async () => {
                const password = "Test123";
                const hashedPassword = await PasswordUtils.hashPassword(password);
                expect(hashedPassword).toEqual(expect.any(String));
                expect(hashedPassword).not.toEqual(password);
            });
        });
    });

    describe("comparePassword", () => {
        it("should return true if hashed password is the same as the original password", async () => {
            const password = "Test123";
            const hashedPassword = await PasswordUtils.hashPassword(password);
            const arePasswordEqual = await PasswordUtils.comparePasswords(password, hashedPassword);
            expect(arePasswordEqual).toBe(true);
        });
        it("should return false if the hashed password is not the same as the original password", async () => {{
            const password = "Test123";
            const hashedPassword = await PasswordUtils.hashPassword(password);
            const arePasswordEqual = await PasswordUtils.comparePasswords("Test1234", hashedPassword);
            expect(arePasswordEqual).toBe(false);
        }});
    });

});

