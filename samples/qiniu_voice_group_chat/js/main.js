import jsonwebtoken from 'jsonwebtoken'

function genJwtToken() {
    const token = jsonwebtoken.sign({ foo: 'bar' }, 'ssssss')
    return token
}

const ws_url = 'ws://localhost:3000'

// @todo 自定义子协议
const ws_protocols = []

const ws = new WebSocket(ws_url, ws_protocols)
console.log(ws)

//events: open, message, error, close

ws.addEventListener('open', event => {

    // 授权
    const auth_content = {
        action: 'auth',
        type: 'jwt',
        token: genJwtToken()
    }
    ws.send(JSON.stringify(auth_content))
})

ws.addEventListener('message', event => {
    console.log(event.data)
})

ws.addEventListener('close', () => {
    console.log('websocket close')
})

let n = 0
let timer = setInterval(() => {
    console.log('interval:' + n)
    if (n === 20) {
        console.log('interval end')
        clearInterval(timer)
    } else {
        ws.send('ping')
        n++
    }
}, 500)