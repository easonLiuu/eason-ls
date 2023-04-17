const cp = require('child_process')
module.exports = function getFileUser (stat) {
    const { uid, gid } = stat
    const username = cp.execSync('id -un ' + uid).toString().trim()
    // 拿到当前用户所有的groupId
    const groupIdsStr = cp.execSync('id -G ' + uid).toString().trim()
    const groupIds = groupIdsStr.split(' ')
    const groupIdsNameStr = cp.execSync('id -Gn ' + uid).toString().trim()
    const groupIdsName = groupIdsNameStr.split(' ')
    const index = groupIds.findIndex(id => +id === +gid)
    const groupName = groupIdsName[index]
    // console.log(groupIds, groupIdsName)

    // username是个buffer

    return username + ' ' + groupName
}