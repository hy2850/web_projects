## immutable.js
immutable 객체를 직접 만들 수 있음
https://velopert.com/3486

<br>

---

기존에 있는 일반 object, array를 immutability 유지하며 바꿔서 새로운 객체 반환

## immer
https://kyounghwan01.github.io/blog/React/immer-js/#redux%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-immer-%E1%84%8A%E1%85%B3%E1%84%80%E1%85%B5

https://immerjs.github.io/immer/example-setstate/

<br>

## immutability-helper
위 둘과 비교해선 outdated된 느낌

공식 Doc : https://github.com/kolodny/immutability-helper
이걸로 Array 처리하는 다양한 방법 https://stackoverflow.com/questions/55436821/using-immutability-helper-with-array-object-map
벨로퍼드 튜토리얼 : https://velopert.com/1015

<br>

---

React update fetch example (차례로 raw JS / immutability helper / Immer / useImmer)
```js
function updateTodo(todoId:string, new_name:string){
	let databody = {
		"name": new_name,
	}

	return fetch(`http://localhost:8080/${todoId}`, {
		method: 'PATCH',
		body: JSON.stringify(databody),
		headers: {
			'Content-Type': 'application/json'
		},
	})
	.then(res => res.json())
	.then(data=>{
	  console.log(data)
	  // 🚨 todoId를 가지는 원소만 바꾸고싶다!!
	  setTodoList(prev => prev.map(todo=>
						  todo._id===todoId ? data : todo))
	})
	//https://stackoverflow.com/questions/49477547/setstate-of-an-array-of-objects-in-react
}
```

```js
//https://github.com/kolodny/immutability-helper
import update from 'immutability-helper'

async function updateTodo(todoId:string, new_name:string){ // async로 바꿈
	let databody = {
		"name": new_name,
	}

	let res = await fetch(`http://localhost:8080/${todoId}`, {...})
	let data = await res.json()
	
	// 🚨 todoId를 가지는 원소만 바꾸고싶다!!
	const idx = todoList.findIndex(todo=>todo._id===todoId)
	setTodoList(prev=>update(prev, {[idx]:{$set:data}}));
	return Promise.resolve("Success!");
}

```


```js
//immer
import update from 'immutability-helper'
async function updateTodo(todoId:string, new_name:string){
	...
	
	// 🚨 todoId를 가지는 원소만 바꾸고싶다!!
	setTodoList(prev =>
	  produce(prev, draft => {
		const idx = prev.findIndex(todo=>todo._id===todoId)
		draft[idx] = data;
	  }));
	return Promise.resolve("Success!");
}

// use-immer
import { useImmer } from "use-immer";
const [todoList, setTodoList] = useImmer<TODO[]>([]);
async function updateTodo(todoId:string, new_name:string){
	...
	
	// 🚨 todoId를 가지는 원소만 바꾸고싶다!!
	const idx = todoList.findIndex(todo=>todo._id===todoId)
	setTodoList(prev => { prev[idx] = data });
}
```


immutable.js나 immutability-helper는 커맨드에 익숙해지는데 시간이 좀 필요하지만,
immer (or use-immer)는 Plain JS에서 Obj/Array 바꾸듯이 그냥 쓰면 돼서 정말 편함.

다만, 성능 이슈가 있으므로 데이터의 구조가 복잡할 때만 사용하기 [ref](https://react.vlpt.us/basic/23-immer.html#:~:text=%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94%20%EA%B2%83%EC%9D%84%20%EA%B6%8C%EC%9E%A5%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4.-,%EB%8B%A4%EB%A7%8C%2C%20%EB%AC%B4%EC%A1%B0%EA%B1%B4%20%EC%82%AC%EC%9A%A9%EC%9D%84%20%ED%95%98%EC%A7%84%20%EB%A7%88%EC%8B%9C%EA%B3%A0,-%2C%20%EA%B0%80%EB%8A%A5%ED%95%98%EB%A9%B4%20%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%9D%98%20%EA%B5%AC%EC%A1%B0%EA%B0%80)
간단할 때는 그냥 Plain-JS(map, filter, splice)로 immutability 처리
