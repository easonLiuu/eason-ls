const fs = require("fs")
module.exports = function auth(mode) {
    let authString = ''
    // user
    const canUserRead = mode & fs.constants.S_IRUSR
    const canUserWrite = mode & fs.constants.S_IWUSR
    const canUserExecute = mode & fs.constants.S_IXUSR

    // group
    const canGroupRead = mode & fs.constants.S_IRGRP
    const canGroupWrite = mode & fs.constants.S_IWGRP
    const canGroupExecute = mode & fs.constants.S_IXGRP

    // other
    const canOtherRead = mode & fs.constants.S_IROTH
    const canOtherWrite = mode & fs.constants.S_IWOTH
    const canOtherExecute = mode & fs.constants.S_IXOTH

    canUserRead ? authString += 'r' : authString += '-'
    canUserWrite ? authString += 'w' : authString += '-'
    canUserExecute ? authString += 'x' : authString += '-'
    canGroupRead ? authString += 'r' : authString += '-'
    canGroupWrite ? authString += 'w' : authString += '-'
    canGroupExecute ? authString += 'x' : authString += '-'
    canOtherRead ? authString += 'r' : authString += '-'
    canOtherWrite ? authString += 'w' : authString += '-'
    canOtherExecute ? authString += 'x' : authString += '-'

    // console.log(canUserRead, canUserWrite,canUserExecute)
    return authString
}