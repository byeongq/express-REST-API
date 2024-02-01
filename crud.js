const express = require('express')
const app = express()

const database = [
    {id: 1, title: '글1'},
    {id: 2, title: '글2'},
    {id: 3, title: '글3'},
]

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/database', (req, res) => {
    res.send(database)
})

app.get('/database/:id', (req, res) => {
    const id = req.params.id
    const data = database.find(el => el.id === Number(id))
    res.send(data)
})

app.post('/database', (req, res) => {
    const id = database.length
    const title = req.body.title
    database.push({
        id: id+1,
        title
    })
    res.send('success')
})

app.put('/database', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    database[id-1].title = title
    res.send('success')
})

app.delete('/database', (req, res) => {
    const id = req.body.id
    const idx = database.findIndex(i => i.id === Number(id))
    database.splice(idx, 1)
    res.send('success')
})

app.listen(3000, () => {
    console.log('server on!')
})