const assert = require('assert')
const parseArgs = require('../bin/parseArgs')
const getFileUser = require('../bin/getFileUser')
const getFileType = require('../bin/getFileType')
const getAuth = require('../bin/auth')


describe("eason-ls", () => {
    describe("parseArgs", () => {
        it("args test", () => {
            const { args, isList, isAll } = parseArgs()
            // console.log(args)
            assert.equal(isList, false)
            assert.equal(isAll, false)
            assert.equal(args.length, 1)
            assert.equal(args[0], 'test/test.js')
        });
    })
    describe("getFileUser", () => {
        it("get current user", () => {
            const stat1 = { uid: 501, gid: 20 }
            const user1 = getFileUser(stat1)
            assert.equal(user1, 'liujiarui staff')
        })
        it("get root user", () => {
            const stat2 = { uid: 0, gid: 0 }
            const user2 = getFileUser(stat2)
            assert.equal(user2, 'root wheel')
        })
    })
    describe("getFileType", () => {
        it("is file", () => {
            const mode = 32768
            const res = getFileType(mode)
            assert.equal(res, '-')
        })
        it("is directory", () => {
            const mode = 16384
            const res = getFileType(mode)
            assert.equal(res, 'd')
        })
        it("is link", () => {
            const mode = 40960
            const res = getFileType(mode)
            assert.equal(res, 'l')
        })
        it("block device", () => {
            const mode = 24576
            const res = getFileType(mode)
            assert.equal(res, 'd')
        })
    })
    describe("getAuth", () => {
        it("user rwx------", () => {
            const mode = 4544 // user rwx
            const str = getAuth(mode)
            assert.equal(str, 'rwx------')
        })
        it("group ---rwx---", () => {
            const mode = 4152
            const str = getAuth(mode)
            assert.equal(str, '---rwx---')
        })
        it("other ------rwx", () => {
            const mode = 4103
            const str = getAuth(mode)
            assert.equal(str, '------rwx')
        })
        it("none ---------", () => {
            const mode = 4096
            const str = getAuth(mode)
            assert.equal(str, '---------')
        })
        it("bad mode: 0", () => {
            const mode = 0
            const str = getAuth(mode)
            assert.equal(str, '---------')
        })
        it("bad mode: string", () => {
            const mode = 'a'
            const str = getAuth(mode)
            assert.equal(str, '---------')
        })
    })
})