import TestHelpers from "../test-helpers";
import models from "../../src/models";

describe("User", () => {
    beforeAll(async () => {
        await TestHelpers.startDb();
    });

    afterAll(async () => {
        await TestHelpers.stopDb();
    });

    describe("hooks", () => {
        beforeEach(async () => {
            await TestHelpers.syncDb();
        });
        it("should create an user with a hashed password", async () => {
            const {User} = models;
            const email = "test@example.com";
            const password = "Test123";
            await User.create({email, password});
            const users = await User.findAll();
            expect(users.length).toBe(1);
            expect(users[0].email).toEqual(email);
            expect(users[0].password).not.toEqual(password);
        });
    });

});