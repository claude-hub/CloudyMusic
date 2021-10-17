const rewire = require("rewire")
const Login = rewire("./Login")
const hasErrors = Login.__get__("hasErrors")
// @ponicode
describe("hasErrors", () => {
    test("0", () => {
        let callFunction = () => {
            hasErrors({ key: "elio@example.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            hasErrors({ key: "Elio" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            hasErrors({ key: "Dillenberg" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            hasErrors(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
