JS는 일반적인 프로그래밍 언어의 block-level scope와는 다른 function-level scope를 씀.
```JS
var x = 0;
{
	var x = 1; // 함수 안에서 선언된게 아니므로 global 변수; 0을 overwrite → let으로 바꾼다면?
	console.log(x); // 1
}
console.log(x); // 1

var y = 0;
function scope_test(){
	var y = 1; // local 변수
	console.log(y);
}
scope_test() // 1
console.log(y); // 0
```

이건 굉장히 헷갈리고, <u>for문 등에서 var를 사용할때 자동으로 global var이 되어서</u> 버그를 발생시키는 일이 종종 있다.

따라서, <span style="color:red">var 대신 let을 사용</span>하자!
[참고 Toast UI 코딩컨벤션 - var 대신 let 이나 const 사용](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION#%EA%B0%92%EC%9D%B4-%EB%B3%80%ED%95%98%EC%A7%80-%EC%95%8A%EB%8A%94-%EB%B3%80%EC%88%98%EB%8A%94-const%EB%A5%BC-%EA%B0%92%EC%9D%B4-%EB%B3%80%ED%95%98%EB%8A%94-%EB%B3%80%EC%88%98%EB%8A%94-let%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%84%A0%EC%96%B8%ED%95%9C%EB%8B%A4-var%EB%8A%94-%EC%A0%88%EB%8C%80%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80-%EC%95%8A%EB%8F%84%EB%A1%9D-%ED%95%9C%EB%8B%A4)
[ESLint - no-var](https://eslint.org/docs/rules/no-var)



Block-scope를 지원하는 let , const가 ES6에서 소개됨.
https://poiemaweb.com/es6-block-scope

```js
// Case 1 
let x = 0;
{
	var x = 1; // SyntaxError: Identifier 'x' has already been declared
	console.log(x);
}
console.log(x);

// Case 2
var x = 0;
{
	let x = 1;
	console.log(x); // 1
}
console.log(x); // 0
```



JS 파일간 전역변수가 공유됨
https://heygyun.tistory.com/47
https://stackoverflow.com/questions/8348401/javascript-two-separate-scripts-share-variables

