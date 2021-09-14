# Batching

한 <u>React event (ex. onClick, 여러 setState 호출하는 helper 함수)</u> 내에 여러 state update가 일어날 경우, 매번 re-rendering하기엔 cost가 너무 크니까, 퉁쳐서 맨 마지막에만 한번 해주는 기능.

~~⚡️**중간 과정은 생략됨**~~ -> rendering을 맨 마지막에만 해서 그렇게 보이는 것 뿐, 실제로는 다 처리함

[Answer by Dan](https://github.com/reactwg/react-18/discussions/21 "Automatic batching for fewer renders in React 18 · Discussion #21 · reactwg_react-18.mhtml")에서 잘 설명해준다.



14Sep21 - 헷갈린 점 : 동일한 대상에 대한 setState만 batching되나?
ex) 한 함수 내에 setNum 4개 + setFlag 1개 있으면, setNum만 하나로 batching되고, setFlag는 따로?
→ No. <u>한 React event 내에 있는 모든 setState가 batching 대상</u>인 듯

참고 1) 바로 위 'Answer by Dan' 글
참고 2) “React batch updating” — Nitai Aharoni 🎾 https://link.medium.com/CfD5AoI4wjb 
이 글 예시를 보니, 동일 state에 대한 업데이트만 batching되는게 아니고, 한 event 단위인 ```handleClick``` 내의 3가지 setState가 batching됨.

<br>

❗ 중요한 점은,  동일한 state에 대한 업데이트가 여럿 중첩되는 경우, 맨 마지막을 제외하고 다 ~~무시됨.~~
 -> ✨실제로 무시되는게 아니고, 사실상 무시되는 것.
 setNum(1); setNum(2); 가 동시에 이루어지면, 결국 2로 설정되니까.
 이때, useEffect[num]으로도 과정이 안찍히는데, **맨 마지막에만 rendering이 이루어지므로 그때만 useEffect가 실행돼서 그럼** ([[[Hooks] LifeCycle]] useEffect 참고)

ex) 초기 rendering 후 useEffect[num] 실행해서 setNum(100) 실행 
-> 이어서 useEffect[dummy] 실행되며 setNum(1) 실행 
-> setNum(100)과 setNum(1)의 batching이 이루어져 후자만 살아남음.
실제로 console 보면, setNum(100)은 ~~무시됨.~~
```JS
import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [num, setNum] = useState(-1);
  const [dummy, setDummy] = useState(false);

  useEffect(() => {
    console.log("setNum : ", num);
    if (num === -1) setNum(100);
  }, [num]);

  useEffect(() => {
    console.log("Init dummy : ", dummy);
    setNum(1);
  }, [dummy]);

  return (
    <div className="App">
      <div> {num} </div>
    </div>
  );
}
```

<br>

현재 (React 17 - 17Aug21) Batching은 outside event (promise, setTimeout 등)에는 적용되지 않는데, 이를 이용해서 batching을 느낄 수 있는 [example](https://codesandbox.io/s/react-batching-example1-eze5f?file=/src/index.js) 만들어봄

참고) React 18부터는 모든 setState에 대해 batching 적용될 것
(by [Dan](https://github.com/reactwg/react-18/discussions/21 "Automatic batching for fewer renders in React 18 · Discussion #21 · reactwg_react-18.mhtml"))

<br>

참고한 질문들

https://stackoverflow.com/questions/53048495/does-react-batch-state-update-functions-when-using-hooks/53048903#53048903

https://stackoverflow.com/questions/48563650/does-react-keep-the-order-for-state-updates

이거 이해 못해서 고생한 내가 올렸던 질문
(setNum(100)이 무시되는게 아니라,
re-render 이후에만 useEffect가 실행되기 때문에 안뜬 것
functional update는 제대로 반영이 되잖아?)
https://stackoverflow.com/questions/68791489/separately-called-react-setstate-giving-unexpected-result/68791555?noredirect=1#comment121574571_68791555

<br>

---

<details>
<summary>Batching example 코드 Save</summary>
<p>

```JS
// Example1 : rendering in batching vs no-batching

import React, { Fragment, useState } from "react";

export default function Ex1() {
  const [a, setA] = useState("a");
  const [b, setB] = useState("b");
  console.log("a", a);
  console.log("b", b);

  // No batching - 2 rendering
  function handleClickWithPromise() {
    Promise.resolve().then(() => {
      setA("aa");
      setB("bb");
    });
  }

  // Batching - 1 rendering
  function handleClickWithoutPromise() {
    setA("aa");
    setB("bb");
  }

  return (
    <Fragment>
      <button onClick={handleClickWithPromise}>
        {a}-{b} with promise
      </button>
      <button onClick={handleClickWithoutPromise}>
        {a}-{b} without promise
      </button>
    </Fragment>
  );
} 
```
```JS
// Example2 : same setState ignored except the last in the batching

import React, { useState, useEffect } from "react";

export default function Ex2() {
  const [num, setNum] = useState(0);
  console.log("Rendered");

  useEffect(() => {
    console.log("Num : ", num);
  }, [num]);

  /*
  Currently (React 17 - 17Aug21), not batched 
  Will also be batched in React 18
  About current batching : https://stackoverflow.com/questions/48563650/does-react-keep-the-order-for-state-updates
  Announcement : https://github.com/reactwg/react-18/discussions/21
  */
  function handleClickWithPromise() {
    Promise.resolve().then(() => {
      setNum(1);
      setNum(2);
      setNum(3);
      setNum(4);
    });
  }

  function handleClickWithoutPromise() {
    setNum(1);
    setNum(2);
    setNum(3);
    setNum(4);
  }

  return (
    <>
      <button onClick={handleClickWithPromise}>{num} with promise</button>
      <button onClick={handleClickWithoutPromise}>{num} with promise</button>
    </>
  );
}
```
```JS
// Example3 : functional updates aren't ignored; but still only rendered at the end

import React, { useState, useEffect } from "react";

export default function Ex3() {
  const [num, setNum] = useState(0);
  console.log("Rendered");

  useEffect(() => {
    console.log("Num : ", num);
  }, [num]);

  function add() {
    setNum(num + 1);
    setNum(num + 2);
    setNum(num + 3);
  }

  function functional_add() {
    setNum((n) => n + 1);
    setNum((n) => n + 2);
    setNum((n) => n + 3);
  }

  return (
    <>
      <button onClick={add}>normal add</button>
      <button onClick={functional_add}>add with functional update</button>
    </>
  );
}
```
</p>
</details> 