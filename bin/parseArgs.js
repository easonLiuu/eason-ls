module.exports = function parse() {
    let isAll = false// -a 
    let isList = false //-l
    const args = process.argv.slice(2)
    // console.log(process.argv, args)
    args.forEach(arg => {
        if (arg.indexOf('a') >= 0) {
            isAll = true
        }
        if (arg.indexOf('l') >= 0) {
            isList = true
        }
    })
    return {
        args,
        isAll,
        isList
    }
}