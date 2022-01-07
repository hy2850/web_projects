## ES6 - import, export

[Official doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

1. Default export - only one per module

   `export default {module}`
   → `import A from ''`

2. Named exports - zero or more per module

   `export {module}`
   → `import {B, C} from ''`

정리 : [Module_require vs import (CommonJs와 ES6) _ bono blog](https://blueshw.github.io/2017/05/16/ES-require-vs-import/)



더 자세한 예시 정리 : 
export default는 괄호 없이, 그냥 export는 괄호 안에 (원하는 것만 import)

```js
// module1 - 기본적인 export/import
export default defaultExport
export {export1, export2}

// import시?
import defaultExport from 'module1'
import defaultExport, {export1} from 'module1' // export1만 꺼내쓰기


// module2 - 필요한 함수를 obj로 묶어서 export default 
export default { OnInstructorPlayPause, OnInstructorTimeChange };

// import시?
import mod2 from 'module2'
mod2.OnInstructorPlayPause
mod2.OnInstructorTimeChange 
```



#### - 가끔 보이는 `import * as alias` vs `import alias`

```typescript
import * as ts from 'typescript'
ts.SourceFile
import * as dotenv from 'dotenv'
dotenv.config()
```

저건 뭘까? 왜 그냥 `import dotenv from 'dotenv'` 라고 쓰지 않지?

[✨ Stackoverflow - ES6: "import * as alias" vs "import alias"](https://stackoverflow.com/questions/45697628/es6-import-as-alias-vs-import-alias)





## CommonJS - Require, exports

Q. `require`라는건 뭐냐? (+ `module.exports = { }`)

ES6에서 import와 export 도입되기 전 CommonJS에서 쓰던 모듈 import 함수.

원래 JS 파일들끼린 HTML에 script 로드 시, 전역변수를 모두 공유함.

CommonJS의 등장으로 모듈화를 지원하게 되면서 import 용도로 쓰이던데 require인 듯.

[참고) Module_JavaScript 표준을 위한 움직임_ CommonJS와 AMD](https://d2.naver.com/helloworld/12864)





---

자바스크립트 모듈 시스템 (계속 추가되고 업데이트 되나봄)

* CommonJs (require, exports)
* AMD (Asynchronous Module Definition)
* ES6 내장 모듈 (import, export)



