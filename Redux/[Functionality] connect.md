# ```connect```? ```mapDispatchToProps```? 이건 또 뭐야

[이 질문](https://stackoverflow.com/questions/39419237/what-is-mapdispatchtoprops)읽어보기.
controlled component에서 Redux logic을 직접적으로 쓰지 않고 (= store.dispatch 같은 코드 안쓰고), 외부(부모 컴포넌트 레벨)에서 Redux store에 연결해 사용하는 방식 같음.
즉, component와 redux logic을 decoupling해서 쓰는 방법. 

   controlled component는 props만 가지고 store와 통신하므로 재사용성 증가 (modularity)

   질문 댓글에도 비슷한 내용이 있다.
   
> If you coupled your component to store.dispatch, then when you decide to factor out redux, or want to use it some place that isn't redux based (or some other thing I can't think of now) you are stuck with a lot of changes. 
> 
> ...
> 
> mapDispatchToProps is provided so you can write well designed, cleanly **decoupled components**.

<br>

React Hooks 도입 이전에 클래스 컴포넌트를 사용할 때 쓰던 방법이라고 한다.
현재는 useSelector, useDispatch가 워낙 편리하기 때문에 쓸 일이 없는 함수.
https://react.vlpt.us/redux/09-connect.html

>`connect`는 [HOC](https://velopert.com/3537)입니다. HOC란, Higher-Order Component 를 의미하는데요, 이는 리액트 컴포넌트를 개발하는 하나의 패턴으로써, 컴포넌트의 로직을 재활용 할 때 유용한 패턴입니다. 예를 들어서, 특정 함수 또는 값을 props 로 받아와서 사용하고 싶은 경우에 이러한 패턴을 사용합니다. 
>리액트에 Hook이 도입되기 전에는 HOC 패턴이 자주 사용되어왔으나, 리액트에 Hook 이 도입된 이후에는 HOC를 만들 이유가 없어졌습니다. 대부분의 경우 Hook으로 대체 할 수 있기 때문이지요. 심지어, 커스텀 Hook을 만드는건 굉장히 쉽기도 합니다.
>
>HOC를 직접 구현하게 되는 일은 거의 없기 때문에 지금 시점에 와서 HOC를 직접 작성하는 방법을 배워보거나, 이해하기 위해 시간을 쏟을 필요는 없습니다.

[이 질문](https://stackoverflow.com/questions/59748180/should-i-use-useselector-usedispatch-instead-of-mapstatetoprops)에서도 useSelector, useDispatch 사용을 권장하는 듯

<br>
<br>

flow chart 찾아보다가 발견한 connect 사용하던 시절 Redux walkthrough
https://javascript.plainenglish.io/redux-walkthrough-b11dbfb48d61