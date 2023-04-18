module.exports = function(stat) {
    // console.log(stat)
    const { mtimeMs, size } = stat
    const birthTime = new Date(mtimeMs)
    // console.log(birthTime.getMonth(), birthTime.getDate())
    const month = birthTime.getMonth() + 1
    const date = birthTime.getDate()
    const hour = birthTime.getHours()
    const minute = birthTime.getMinutes()
    return size + ' ' + month + '月  ' + date + ' ' + hour + ':' + minute
}