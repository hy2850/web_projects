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

Q. 저건 뭘까? 왜 그냥 `import dotenv from 'dotenv'` 라고 쓰지 않지?

A. `import dotenv from 'dotenv'`로 쓰면, 'dotenv' 모듈의 default export만 import 되잖아!
아마 ts, dotenv 같이 모듈 이름을 써서 멤버 함수들을 사용하고 싶은 경우에 쓰는 듯.
파이썬에서도 이렇게 하는 경우 있잖아!

```python
import numpy as np
np.ones(10)
```

[✨ Stackoverflow - ES6: "import * as alias" vs "import alias"](https://stackoverflow.com/questions/45697628/es6-import-as-alias-vs-import-alias)



#### - import 시 index.js 생략했을 때 (module resolution)

```JS
import indexRouter from './routes/index.js'; // full import
import indexRouter from './routes' // fails with node v16.13.0
```

FE개발 플젝 할때 아래와 같이 써도 되길래 Node에서 기본 제공하는 기능인줄 알았는데 아니었다.

플젝할 때 문제 없었던 건, CRA에 딸려오는 Webpack이 module resolution을 다 해줘서 인듯.

module resolution 좋은 ref 1) https://stackoverflow.com/questions/59556130/esm-importing-all-files-from-folder-with-index-js-not-working
좋은 ref 2) https://stackoverflow.com/questions/37159533/es6-ecmascript-2015-modules-import-index-js
좋은 ref 3) https://stackoverflow.com/questions/64453859/directory-import-is-not-supported-resolving-es-modules-with-node-js

`node --experimental-specifier-resolution=node app` 으로 실행하거나, 파일명까지 full import 하기. 

* Webpack에 `.jsx` 파일 resolution 되도록 설정 바꾸는 것 - https://stackoverflow.com/questions/34678314/webpack-cant-find-module-if-file-named-jsx





## CommonJS - Require, exports

Q. `require`라는건 뭐냐? (+ `module.exports = { }`)

ES6에서 import와 export 도입되기 전 CommonJS에서 쓰던 모듈 import 함수.

원래 JS 파일들끼린 HTML에 script 로드 시, 전역변수를 모두 공유함.

CommonJS의 등장으로 모듈화를 지원하게 되면서 import 용도로 쓰이던데 require인 듯.

[참고) Module_JavaScript 표준을 위한 움직임_ CommonJS와 AMD](https://d2.naver.com/helloworld/12864)



```JS
// import
const express = require('express'); // import module
const { Post, Hashtag } = require('../models'); // import local file
// Object destructuring; db : Object containing 'Post' and 'Hashtag'

// Default export (ES6 export default) 예시들
module.exports = class Comment extends Sequelize.Model {...}
module.exports = mongoose.model('User', userSchema);
module.exports = router;

// 한 파일 내에서 여러 개 export (ES6 export { moduleA, moduleB })
exports.isLoggedIn = (req, res, next) => {...}
exports.isNotLoggedIn = (req, res, next) => {...}
// const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
// const { isLoggedIn } = require('./middlewares'); 처럼 하나만 import하는 것도 가능
```





Q. ES6 import 와 CommonJS require의 차이점?
A. CommonJS require는 모듈 전체 import (파이썬의 `import numpy as np` 처럼)
ES6 import는 모듈의 일부 함수, 변수만 import 가능 (파이썬의 `from numpy import ones` 같은느낌)
https://stackoverflow.com/questions/46677752/the-difference-between-requirex-and-import-x



Q. ES6 import  와  CommonJS require를 같이 쓸 수 있나?
A. 그냥은 안되는 듯. 혼용하지 말자. 아래 링크 보면 특별한 작업을 거쳐서 가능한 것 같음.
https://www.kindacode.com/article/node-js-how-to-use-import-and-require-in-the-same-file/

 

Q. ES6 import와 CommonJS require 어떤 걸 쓰더라고 import가 가능한 모듈 만들 수 있나?
A. [Is it possible to es6 import a commonjs module?](https://stackoverflow.com/questions/55167994/is-it-possible-to-es6-import-a-commonjs-module) 에서는 안된다고 하는데, [여기선](https://stackoverflow.com/questions/70691479/is-commonjs-require-still-used-or-deprecated/70691552#:~:text=And%2C%20it%27s%20possible%20to%20write%20modules%20that%20can%20be%20used%20as%20native%20modules%20in%20both%20nodejs%20and%20the%20browser%20as%20both%20now%20support%20ESM%20modules.) 된다고 나오네?
(업데이트) 이 [글](https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1) 보면 가능한 듯. 근데 hassle이라고 표현하는거 보니 되게 귀찮은 듯.



---

자바스크립트 모듈 시스템 (계속 추가되고 업데이트 되나봄)

* AMD (Asynchronous Module Definition) - Totally deprecated ([참고](https://www.reddit.com/r/javascript/comments/3vqgai/eli5_commonjs_vs_amd_vs_es6/))
* CommonJs (require, exports) - Slowly dying, will be replaced by ES6 import ([참고](https://stackoverflow.com/questions/70691479/is-commonjs-require-still-used-or-deprecated?noredirect=1#comment124970219_70691479))
* ES6 내장 모듈 (import, export)

https://ko.javascript.info/modules-intro



---

NodeJS에서 ES6 modules (import/export) 쓰려면 package.json에 {"type": "module"}로 명시해줘야 함.

https://nodejs.org/api/packages.html#packages_determining_module_system
