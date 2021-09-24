# promise

아직 값이 처리되지 않은 <u>미확정</u> 프로미스는 pending 상태
Promise는 resolve 혹은 reject 호출해서 상태 확정 가능

```js
new Promise((resolve, reject)=>{
	if(error) reject("rejected");
    else resolve(answer);
})
.then(function(success){
        console.log(success); // answer
    }, 
    function(fail){
        console.log(fail); // "rejected"
    }
);
```

then은 Promise resolve 혹은 reject 된 값 (string, obj, number, 아무거나)을 가지고 실행됨.



### promise chaining 관련 궁금했던 점

```js
// https://stackoverflow.com/questions/37555031/why-does-json-return-a-promise
fetch(url)
    .then(response => response.json())
    .then(post => document.write(post.title));
```

Q. `response.json`은 promise객체를 반환하는데, 다음 `.then`에서 받는 post는 일반 값이네? 뭐지?
→ `res.json()`이 새 promise 반환하는거 맞음. 다음 `.then`은 그 promise가 resolve/reject 된 후에, 콜백에 resolve/reject 값 넣어서 실행. 

핵심 : `.then`은 새로운 promise를 반환함.

then 인자로 들어가는 콜백에서 다시 promise를 리턴하든 (`res.json()`) 일반 값을 리턴하든 상관 없음.
일반 값/객체를 리턴해도 then/catch는 그 값을 얻을 수 있는(resolve) Promise 객체를 리턴하기 때문
[확실한 출저](https://www.daleseo.com/js-async-promise/#:~:text=%EC%97%AC%EA%B8%B0%EC%84%9C%20%EC%A3%BC%EC%9D%98%ED%95%98%EC%8B%A4%20%EC%A0%90%EC%9D%80%20then()%EA%B3%BC%20catch()%EC%9D%98%20%EC%9D%B8%EC%9E%90%EB%A1%9C%20%EB%84%98%EA%B8%B4%20%EC%BD%9C%EB%B0%B1%20%ED%95%A8%EC%88%98%EB%8A%94%203%2C%204%EB%B2%88%EC%A7%B8%20%EC%A4%84%EC%B2%98%EB%9F%BC%20%EC%9D%BC%EB%B0%98%20%EA%B0%9D%EC%B2%B4%EB%A5%BC%20%EB%A6%AC%ED%84%B4%ED%95%98%EB%93%A0%205%EB%B2%88%EC%A7%B8%20%EC%A4%84%EC%B2%98%EB%9F%BC%20Promise%20%EA%B0%9D%EC%B2%B4%EB%A5%BC%20%EB%A6%AC%ED%84%B4%ED%95%98%EB%93%A0%20%ED%81%AC%EA%B2%8C%20%EC%83%81%EA%B4%80%EC%9D%B4%20%EC%97%86%EB%8B%A4%EB%8A%94%20%EA%B2%83%EC%9E%85%EB%8B%88%EB%8B%A4.%20%EC%99%9C%EB%83%90%ED%95%98%EB%A9%B4%20%EC%9D%BC%EB%B0%98%20%EA%B0%9D%EC%B2%B4%EB%A5%BC%20%EB%A6%AC%ED%84%B4%ED%95%A0%20%EA%B2%BD%EC%9A%B0%2C%20then()%EA%B3%BC%20catch()%20%EB%A9%94%EC%86%8C%EB%93%9C%EB%8A%94%20%ED%95%AD%EC%83%81%20%EA%B7%B8%20%EA%B0%9D%EC%B2%B4%EB%A5%BC%20%EC%96%BB%EC%9D%84%20%EC%88%98%20%EC%9E%88%EB%8A%94%20Promise%20%EA%B0%9D%EC%B2%B4%EB%A5%BC%20%EB%A6%AC%ED%84%B4%ED%95%98%EB%8F%84%EB%A1%9D%20%EB%90%98%EC%96%B4%20%EC%9E%88%EA%B8%B0%20%EB%95%8C%EB%AC%B8%EC%9E%85%EB%8B%88%EB%8B%A4.)

> 여기서 주의하실 점은 `then()`과 `catch()`의 인자로 넘긴 콜백 함수는 3, 4번째 줄처럼 일반 객체를 리턴하든 5번째 줄처럼 Promise 객체를 리턴하든 크게 상관이 없다는 것입니다. 왜냐하면 일반 객체를 리턴할 경우, `then()`과 `catch()` 메소드는 항상 그 객체를 얻을 수 있는 Promise 객체를 리턴하도록 되어 있기 때문입니다.

[확실한 출저2](https://web.dev/promises/#queuing-asynchronous-actions)

> When you return something from a `then()` callback, it's a bit magic. If you return a value, the next `then()` is called with that value. However, if you return something promise-like, the next `then()` waits on it, and is only called when that promise settles (succeeds/fails).



[공식 doc) then에 넣어주는 콜백에서 뭘 반환하느냐에 따라 then이 리턴하는 promise 상태가 달라짐](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#%EB%B0%98%ED%99%98%EA%B0%92)
보니까 일반 값 반환하면, 바로 resolve해버리지만 (아무 값 반환 안하면 undefined를 결과값으로 resolve하는거 주목),
프로미스를 반환할 경우, 그 프로미스의 결과값을 그대로 따라감.



Ref

* https://web.dev/promises/#queuing-asynchronous-actions
* https://javascript.info/promise-chaining
* https://www.daleseo.com/js-async-promise/

---

# async-await

Built on top of Promise,
easing the use of Promise chaining

✨ https://ko.javascript.info/async-await#ref-341
여기 있는 코드들 읽어보면 이해됨 (다른 주제 읽어보는 것도 추천)

try~catch 방식
https://velog.io/@vraimentres/async-%ED%95%A8%EC%88%98%EC%99%80-try-catch

