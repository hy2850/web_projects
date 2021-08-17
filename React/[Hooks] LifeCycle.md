[React lifecycle hooks diagram](https://wavez.github.io/react-hooks-lifecycle/)

<br>

1. useEffect


	∴ useEffect가 언제 실행되는지 정리 : 
   - 최초 화면 rendering 후 무조건 한번
   - 이후 state 바뀔때마다 -> re-rendering -> rendering 완료 후 useEffect 실행

<br>

❗ state change가 일어나서 re-rendering되는 경우에만 useEffect 실행
ex) 이미 num이 1이므로, 버튼을 아무리 클릭해봐야 state는 바뀌지 않음.
re-rendering일어나지 않으므로 useEffect 실행X

```JS
import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [num, setNum] = useState(1);

  useEffect(()=>{
    console.log("Num : ", num);
  });

  return (
    <button onClick={()=>setNum(1)}>set to 1</button>
  );
}
```

❗❗ (Dependency가 있는 경우) 자신이 listening 하고 있는 state가 바뀔때만 re-render후 실행
ex2) dummy를 아무리 toggle해서 re-rendering 유도해도, useEffect[num]은 실행X 
(num이 바뀐게 아니므로)
```JS
import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [num, setNum] = useState(1);
  const [dummy, setDummy] = useState(false);

  useEffect(() => {
    console.log("Num : ", num);
  }, [num]);

  useEffect(() => {
    console.log(dummy);
  }, [dummy]);

  return (
    <>
      <button onClick={() => setNum(1)}>set to 1</button>
      <button onClick={() => setDummy((d) => !d)}>
        toggle dummy (re-render)
      </button>
    </>
  );
}

```

<br>

✨ 이 개념 + batching + setState 이해 못해서 헷갈렸던 것
https://stackoverflow.com/questions/68791489/separately-called-react-setstate-giving-unexpected-result/68791555?noredirect=1#comment121574571_68791555