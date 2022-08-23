const dice = () => {
    x = Math.ceil(Math.random()*6)
    return `Your dice rolled a ${x}`

}

const test = () => {
    return "this is a test"
}

const nick = (user, newname) => {
    user.name = newname
    return "your nickname have been updated"
}

const notFound = () => {
    return "sorry command not found"
}

const changeRoom = (user, newroom) => {
    user.room.push(newroom)
    return `you switched to the room ${newroom}`
}

module.exports = { dice, test, nick, notFound, changeRoom }
