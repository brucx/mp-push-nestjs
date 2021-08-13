import * as user_service from "./user.service"

// @ponicode
describe("login", () => {
    let inst: any

    beforeEach(() => {
        inst = new user_service.UserService(undefined)
    })

    test("0", async () => {
        await inst.login("user name")
    })

    test("1", async () => {
        await inst.login("username")
    })

    test("2", async () => {
        await inst.login("user_name")
    })

    test("3", async () => {
        await inst.login("user123")
    })

    test("4", async () => {
        await inst.login(123)
    })

    test("5", async () => {
        await inst.login("")
    })
})
