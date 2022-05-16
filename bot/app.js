process.env.NTBA_FIX_319 = 1


const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

const TelegramBot = require('node-telegram-bot-api');


const token = '5399867116:AAHPC9R96XNTXyqzJtIU49XRnfvWMa0BIb0';
const bot = new TelegramBot(token, {polling: true});

const app = express()
app.use(cors());

const jsonParser = bodyParser.json()


const port = 3001
let chatId

bot.on('message', (msg) => {
    chatId = msg.chat.id;
});


app.post('/', jsonParser, (req, res) => {
    res.send('Hello World!')
    console.log(req.body)
    const messageData = req.body
    bot.sendMessage(chatId, `
        Покупка с кошелька: ${messageData.walletNumber} / ${messageData.walletName}\nПокупатель пришел с ${messageData.userCameFrom} 
    `);
})

app.listen(port, () => {
    console.log('Start')
})

