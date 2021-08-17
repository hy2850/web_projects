🔥 setState is async

setState 직후, console.log(state) 해보면 업데이트가 안되어있다.
Async 하게 update하기 때문.
-> useEffect로 state change 감지해서 처리하는 방법 사용해야 


<br>

⭐ React는 state 변화를 **Object.is**로 판단하는 듯  
[공홈 Ref](https://reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update)
[Why ReactJS using Object.is() for comparison is better than using `===`](https://dev.to/kennethlum/why-reactjs-using-object-is-comparison-is-better-than-using-1kf3)

그래서 state가 바뀌지 않는다면, 업데이트 안함

<br>

+ (공홈 가이드 중) bailout이 뭐지? bailout과 관련된 예시
useEffect는 2번 (1, 2), 그러나 console.log는 3번 (1, 2, 2) 출력 - 마지막 "foo"가 bailout을 위한 extra rendering
```JS
import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [num, setNum] = useState(1); 

  console.log(num); // must execute for every render

  useEffect(()=>{
    console.log("Num : ", num);
  }); // only executed when state changes

  return (
    <button onClick={()=>setNum(2)}>set to 1</button>
  );
}
```
왜 이런게 필요한지는 모르겠다.