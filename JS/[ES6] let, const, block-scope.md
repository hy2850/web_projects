JS는 일반적인 프로그래밍 언어의 block-level scope와는 다른 function-level scope를 씀.
```JS
var x = 0;
{
	var x = 1; // global 변수 (0을 overwrite) -> 함수 안에서 선언된게 아니므로
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

이건 굉장히 헷갈리고, for문 등에서 var를 사용할때 자동으로 global var이 되어서 버그를 발생시키는 일이 종종 있다.

Block-scope를 지원하는 let , const가 ES6에서 소개됨.
https://poiemaweb.com/es6-block-scope