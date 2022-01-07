Class: 기존 JS의 prototype을 활용한 OOP의 syntax sugar
(즉, 구현은 prototype으로 되어 있음)

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes



[static](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes#%EC%A0%95%EC%A0%81_%EB%A9%94%EC%84%9C%EB%93%9C%EC%99%80_%EC%86%8D%EC%84%B1) - 정적 메서드는 클래스의 인스턴스화 없이 호출되며, **클래스의 인스턴스에서는 호출할 수 없습니다.** 

static 변수는 this로는 초기화 불가능한가봄

```js
class A {
    constructor(nth, pos) {
      this.a = 1;
    }
    static b = this.a;

	c = 5;
    static d = this.c;
    static e = "Hello";
}
console.log(A.b); // undefined
console.log(A.d); // undefined
console.log(A.e); // Hello
```

그리고, 인스턴스 만들고 출력해봐도 undefined → 런타임이 아니라, 클래스 생성 시에 초기화되는 그런 건가본데?

```js
testA = new A();
testA.a // 1
testA.c // 5
testA.b // undefined (✅ 인스턴스에서 호출불가)
testA.d // undefined (✅ 인스턴스에서 호출불가)
testA.e // undefined (✅ 인스턴스에서 호출불가)

A.b // ❓ 여전히 undefined
A.e // Hello
```

