# express-Rest API

- 생성: POST
- 수정: PUT, PATCH
- 삭제: DELETE

> BODY 사용할 경우 추가해줄 코드
```
app.use(express.json())
app.use(express.urlencoded({extended: false}))
```

> html 파일을 불러올 경우
```
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'html 경로')
})
```

## database json에 id, title 값만 존재한다는 과정

> Read
```
app.get('/database', (req, res) => {
    res.send(database)
})

// 부분 파일 읽어올때
app.get('/database/:id', (req, res) => {
    const id = req.params.id
    const data = database.find(el => el.id === Number(id))
    res.send(data)
})

```

> Create
```
app.post('/database', (req, res) => {
    const id = database.length + 1
    const title = req.body.title
    database.push({
        id: id,
        title
    })
    res.send('success')
})
```

> Update
```
app.put('/database', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    database[id-1].title = title
    res.send('success')
})
```

> Delete
```
app.delete('/database', (req, res) => {
    const id = req.body.id
    const idx = database.findIndex(i => i.id === Number(id))
    database.splice(idx, 1)
    res.send('success')
})
```