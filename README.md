# Rest API (crud.js)

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

---

# User (user.js)

 - 로그인
 - 회원가입

 > 패스워드 암호화 npm - argon2
 ```
 npm install argon2
 ```

 > Sign Up
 ```
 app.post('/signup', async (req, res) => {
    const {username, password, age, birthday} = req.body
    const hash = await argon2.hash(password)
    database.push({username, password: hash, age, birthday})
    res.send('success')
})
 ```
 1. argon2 암호화 async를 콜백 함수 전에 넣어준다.
 2. `await argon2.hash(패스워드)` 사용해 암호화해 준다.

> Login
```
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
```
 1. argon2 암호화 async를 콜백 함수 전에 넣어준다.
 2. `await argon2.verify(<big long hash, "password")` 사용해 암호화 끼리 값을 비교해 맞으면 true 아닐시 false를 반환한다.