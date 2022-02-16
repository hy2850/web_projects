[What's the difference between `useCallback` with an empty array as inputs and `useCallback` without a second parameter?](https://stackoverflow.com/questions/55026139/whats-the-difference-between-usecallback-with-an-empty-array-as-inputs-and-u)

코멘트 살펴보면,

> If you don't pass it an array as second argument, a new callback function will be created every render, just as `useEffect` with no second argument invokes the effect after every render.
>
> So it's effectively no different than using a normal arrow function then?
>
> Yeah, that's right.

이라고 나와있는데, 대략 useCallback이 어떤 역할 하는지 알 것 같다.



dependency에 있는 값이 바뀌지 않으면, useMemo안의 값 혹은 useCallback 안의 함수는 re-rendering 시에도 바뀌지 않고 유지된다 → performance boost

복잡한 값, 함수일수록 re-render 비용이 커지므로 조금이라도 줄이기 위해 쓰는 듯? (예시 코드 공부해보기) 

