const assert = require('assert')
const parseArgs = require('../bin/parseArgs')


describe("eason-ls", () => {
    describe("parseArgs", () => {
        it("args test", () => {
            const { args, isList, isAll } = parseArgs()
            // console.log(args)
            assert.equal(isList, true)
            assert.equal(isAll, true)
            assert.equal(args.length, 3)
            assert.equal(args[0], 'test/test_args.js')
        })
    })
    // describe("小的组2测试", () => {
    //     it("sum(1) 1", () => {
    //         assert.strictEqual(sum(1), 2)
    //     })
    //     it("sum(1,2) 3", () => {
    //         assert.strictEqual(sum(1, 2), 3)
    //     })
    // })
})