기본 개념 : 전역(global) 상태 관리 like Redux, React 자체 지원

context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있습니다.
(구글에 'react context' 검색해서 그림 보면 감 잡힐 것!)

https://ko.reactjs.org/docs/context.html#when-to-use-context



FE개발 `client/src/lib/socket`의 socket context 만든 steps

1. createContext로 context 만들고

2. `<SocketContext.Provider> ... </SocketContext.Provider>` 형태로 전역 상태 넘겨줄 자식 컴포넌트들 감싸주고

3. 자식 컴포넌트에선 다음과 같은 방식으로 context 정보를 읽어올 수 있다. (`client/src/lib/socket/hooks.tsx` 참고)

   방법1. `<SocketContext.Consumer> ... </SocketContext.Consumer>` 로 감싸주기

   방법2. `useContext` hooks (only 함수 컴포넌트)

   방법3. `static contextType = SocketContext;`로 사용 (only 클래스 컴포넌트)



읽어본 가이드

[DaleSeo](https://www.daleseo.com/react-context/) - 기본 개념 (createContext, Provider, Consumer), 클래스 vs 함수형 (useContext, contextType)

[React Docs - Hooks](https://beta.reactjs.org/learn/passing-data-deeply-with-context#using-and-providing-context-from-the-same-component) - Hooks 활용한 최신 예제. 매우 잘 설명.



