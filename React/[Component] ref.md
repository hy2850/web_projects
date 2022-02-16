[이거](https://blog.logrocket.com/post-hooks-guide-react-call-order/#:~:text=What%20do%20you%20think%20will%20happen%20if%20we%20add%20a%20callback%20ref%3F) 공부하다가 useEffect 실행 전에 '콜백 ref' 라는게 먼저 실행되는거 보고 궁금해짐

https://ko.reactjs.org/docs/refs-and-the-dom.html
컴포넌트의 인스턴스가 마운트 될 때 React는 `ref` 콜백을 DOM 엘리먼트와 함께 호출합니다. 그리고 컴포넌트의 인스턴스의 마운트가 해제될 때, `ref` 콜백을 `null`과 함께 호출합니다.

<br>

DOM interaction을 직접 제어하는 callback ref (?)는 bug-prone하니 있으니 사용에 조심하란다
https://blog.logrocket.com/post-hooks-guide-react-call-order/#:~:text=A%20word%20of%20caution%20with%20callback%20refs



---

리액트 클래스 컴포넌트에서는 `React.createRef()`

함수 컴포넌트에서는 `useRef()`로 생성



용도?

* DOM element 제어

  `<div>` 같은거; 원래는 document.QuerySelector 같은걸로 집어와야되는데, 컴포넌트 라이프사이클에 따라 안되는 상황이 발생.

  ref 사용하면 안전하게 가능
  [벨로퍼드 - useRef 로 특정 DOM 선택하기](https://react.vlpt.us/basic/10-useRef.html)

  [React ref 톺아보기 (클래스 컴포넌트) - 왜 DOM API를 쓰면 안 될까?](https://tecoble.techcourse.co.kr/post/2021-05-15-react-ref/)

* (useRef Hook의 경우) re-rendering시에도 <u>값이 유지되는 변수</u> 생성

  + useRef 값이 바뀌어도 re-rendering ❌
  + useRef 값 바꾸고 바로 바뀐 값 조회 가능 (async하게 일어나서 다음 렌더링때나 바뀐 값 확인 가능한 setState와 다른 점)

  [벨로퍼드 - useRef 로 컴포넌트 안의 변수 만들기](https://react.vlpt.us/basic/12-variable-with-useRef.html)
  
  

(Notion에 정리했던거 여기도 복붙) useRef - 2가지 기능

- Referencing Values with Refs (re-render에도 변함없이 유지되는 값 저장) https://beta.reactjs.org/learn/referencing-values-with-refs

- Manipulating the DOM with Refs (DOM element 제어)

  https://beta.reactjs.org/learn/manipulating-the-dom-with-refs

