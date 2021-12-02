const chats = []
const bcrypt = require('bcryptjs')

module.exports = {
    createMessage: (req, res) => {
        // console.log('hit', req.body)
        const {pin, message} = req.body

        for(let i = 0; i < chats.length; i++){

            const existing = bcrypt.compareSync(pin, chats[i].pinHash)

            if(existing){
                chats[i].messages.push(message)

                const messagesToReturn = {...chats[i]}
                delete messagesToReturn.pinHash
                res.status(200).send(messagesToReturn)
                return
            } 
        }

        let salt = bcrypt.genSaltSync(5)

        let pinHash = bcrypt.hashSync(pin, salt)

        console.log(pin, pinHash)

        let chatObj = {
            pinHash,
            messages: [message]
        }

        chats.push(chatObj)

        let messagesToReturn = {...chatObj}
        delete messagesToReturn.pinHash
        res.status(200).send(messagesToReturn)
    }
}