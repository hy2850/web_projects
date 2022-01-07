REST API CRUD 구현 코드 정리; 클라이언트 - 서버쪽 모두

Point

* App에서 raw JS로 기존 데이터 처리하는 것 (../React/Immutability 참고; 관련 모듈 쓰면 더편하게 가능)
* ⭐️ App에서는 fetch로, server는 express app의 get, post, patch, delete 등 함수로 DB와 연결

<br>

1. GET all
```JS
// app.tsx - View
function getAll(){
    fetch(process.env.REACT_APP_SERVER_URL, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => setTodoList(data))
}

// server.js - Controller
app.get('/', async (req, res) => {
    try {
        const todos = await TodoModel.find()
        res.json(todos)
    } catch (err) {
        res.status(500).json({ message: err.message }) // 500 : server error
    }
})
```

<br>

2. POST - create one
```JS
// app.tsx
function addTodo(name:string){
    let databody = {
        "name": name,
        "isDone": false
    }

    return fetch(process.env.REACT_APP_SERVER_URL as string, {
        method: 'POST',
        body: JSON.stringify(databody),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data=>{
      console.log(data)
      setTodoList(prev => [...prev, data])
    })
	// 맨 뒤에 추가
    // https://stackoverflow.com/questions/50058827/react-how-to-rerender-component-after-post-data-to-database-mongodb
}

// server.js
app.post('/', async (req, res) => {
    const todo = new TodoModel({ 
        name: req.body.name,
        isDone: req.body.isDone
    })
    try{
        const newTodo = await todo.save()
        res.status(201).json(newTodo) // we created something
    }catch(err){
        res.status(400).json({ message:err.message }) // user gave us bad data, so failed
    }
})
```

<br>

3. PATCH (PUT) - update

```JS
// app.tsx
function updateTodo(todoId:string, new_name:string){
    let databody = {
        "name": new_name,
    }

    return fetch(`${process.env.REACT_APP_SERVER_URL}${todoId}`, {
        method: 'PATCH',
        body: JSON.stringify(databody),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data=>{
      console.log(data)
      setTodoList(prev => prev.map(todo=>
                          todo._id===todoId ? data : todo))
    })	
	// 수정한 것만 바꿔치기
	//https://stackoverflow.com/questions/49477547/setstate-of-an-array-of-objects-in-react
}

// server.js
app.patch('/:id', getTodoWithId, async (req, res) => {
    if(req.body.name != null){
        res.todo.name = req.body.name
    }
    if(req.body.isDone != null){
        res.todo.isDone = req.body.isDone
    }

    try{
        const updatedTodo = await res.todo.save()
        res.json(updatedTodo)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

```

<br>

4. DELETE

```JS
// app.tsx
async function deleteTodo(todoId:string){
    let res = await fetch(`${process.env.REACT_APP_SERVER_URL}${todoId}`, {
        method: 'DELETE',
    })
    console.log(res)
    res = await res.json()
    console.log(res)

    setTodoList(prev => {
        return prev.filter(todoObj => todoObj._id !== todoId)
    })
	// 제거한 것 필터링
    // https://stackoverflow.com/a/66029068/9720700
}

// server.js
app.delete('/:id', getTodoWithId, async (req, res) => {
    try{
        await res.todo.remove()
        res.json({message: 'Delete successful'})
    }catch(err){
        res.status(500).json({message : err.message})
    }
})
```