const axios = require('axios')
var data = {name:'',token:'',authHeader:{ headers: { 'X-MailboxToken': '' } },email:''}
const devMailApi = {
    BASE_URL: 'https://www.developermail.com/api/v1/mailbox',
    MESSAGES: 'messages',
    TOKEN: 'token',

    baseUrl: function () {
        return this.BASE_URL
    },

    mailBoxUrl: function (mailbox) {
        if (!mailbox) {
            throw new Error("Mailbox not provided (incorrect, null or undefined)")
        }

        return `${this.BASE_URL}/${mailbox}`
    },

    messagesUrl: function (mailbox) {
        return `${this.mailBoxUrl(mailbox)}/${this.MESSAGES}`
    },

    messageByIdUrl: function (mailbox, id) {
        return `${this.messagesUrl(mailbox)}/${id}`
    },

    tokenUrl: function (mailbox) {
        return `${this.mailBoxUrl(mailbox)}/${this.TOKEN}`
    }
}

function responseHandler(response) {
    return response.data.success === true ? response.data.result : response.data.errors
}


    module.exports.createMailbox = async function () {
        let result = await axios.put(devMailApi.baseUrl())
        data.name = result.data.result.name
        data.token = result.data.result.token
        data.authHeader = { headers: { 'X-MailboxToken': data.token } }
        data.email = `${data.name}@developermail.com`

        return responseHandler(result)
    }
	
    
    async function getMessagesIds() {
        let result = await axios.get(devMailApi.mailBoxUrl(data.name), data.authHeader)

        return responseHandler(result)
    }

    module.exports.getAllMessages = async function () {
        let ids = await getMessagesIds()

        let result = await axios.post(devMailApi.messagesUrl(data.name), ids, data.authHeader)

        return responseHandler(result)
    }

    async function getMessage(id) {
        let result = await axios.get(devMailApi.messageByIdUrl(data.name, id), data.authHeader)

        return responseHandler(result)
    }

    async function getMessages(idsArray) {
        let result = await axios.post(devMailApi.messagesUrl(data.name), idsArray, data.authHeader)

        return responseHandler(result)
    }


