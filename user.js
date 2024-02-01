const express = require('express')
const argon2 = require('argon2')
const app = express()

const database = [
    {id: 1, username: 'abc', password: 'abc'}
]

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/test', function (req, res) {
  res.send('test')
})

app.get('/user', (req, res) => {
    res.send(database)
})

app.post('/signup', async (req, res) => {
    const {username, password, age, birthday} = req.body
    const hash = await argon2.hash(password)
    database.push({username, password: hash, age, birthday})
    res.send('success')
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    const user = database.filter((user) => {
        return user.username === username
    })

    if(user.length === 0){
        res.status(403).send('해당하는 ID가 없습니다.')
        return
    }

    if(!(await argon2.verify(user[0].password, password))){
        res.status(403).send('패스워드가 틀립니다.')
        return
    }

    res.send('로그인 성공.')
})

app.listen(3000, () => {
    console.log('server on!')
})