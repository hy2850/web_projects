[이거](https://blog.logrocket.com/post-hooks-guide-react-call-order/#:~:text=What%20do%20you%20think%20will%20happen%20if%20we%20add%20a%20callback%20ref%3F) 공부하다가 useEffect 실행 전에 '콜백 ref' 라는게 먼저 실행되는거 보고 궁금해짐

https://ko.reactjs.org/docs/refs-and-the-dom.html
컴포넌트의 인스턴스가 마운트 될 때 React는 `ref` 콜백을 DOM 엘리먼트와 함께 호출합니다. 그리고 컴포넌트의 인스턴스의 마운트가 해제될 때, `ref` 콜백을 `null`과 함께 호출합니다.

<br>

DOM interaction을 직접 제어하는 callback ref (?)는 bug-prone하니 있으니 사용에 조심하란다
https://blog.logrocket.com/post-hooks-guide-react-call-order/#:~:text=A%20word%20of%20caution%20with%20callback%20refs