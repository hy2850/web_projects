# Feb22 

## Feb22 Week 3 - 14Jan22 ~ 20Feb22

### 16Feb22 (수) - tsconfig, winston 공부

오전 - Socket.io io.on test reproduce → client/server project directory setup & separation / tsconfig 공부 / esLint ES6 import error

오후 - winston 공부 및 적용, NodeJS 교과서 Ch12 마무리



### 17Feb22 (목) - client-server 플젝 구조

client
server

eslintrc
When using eslint with Typescript, eslintrc @typescript-eslint/parser has 'parserOptions.project' option to specify 'tsconfig' to parse the files with
client and server needs to have separate tsconfig because of this (as each has different files to include)

tsconfig compiler options
include - files to include in the program
esModuleInterop - ES6 module 사용

How to run node server code written in Typescript?? 
실행은 어떻게 하지?

1. compile 'ts' file with 'tsc' into 'js' file and run it with 'nodemon'

2. ts-node → no 'watch'?
    use 'tsc-watch'

  ts-node : tsc + node (no outdir?)
  tsc-watch : tsc + outDir + nodemon (watch)

3. just use nodemon (dev dependency에 nodemon이랑 같이 ts-node도 깔아줘야)
   https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change[]
   [이걸 보면](https://blog.logrocket.com/configuring-nodemon-with-typescript/#:~:text=As%20of%20v1.,as%20the%20execution%20program%20instead.) nodemon이 자동으로 ts-node로 '.ts' 파일 실행하는데.. 
   
   

FE개발 서버 실행하는 방법 정리

server src codes → '.ts'

cannot run with Node directly; transpile into 'js' using `tsc` first and then run with Node, or run with ts-node



Uses nodemon and ts-node together

1. (일단 npm/yarn 패키지들 설치하고 실행시키려면 Node가 있어야 하니까) Dockerfile로 Node 이미지 생성
   - `package*.json` 및 `.env`를 docker container 내부로 `COPY`한 뒤 `RUN yarn`해서 필요한 패키지 설치
   - `COPY . . ` 로 프로젝트 파일들 복사
   - `RUN entrypoint.sh` 로, 컨테이너 실행 시 entrypoint.sh 실행되도록 함
2. 생성한 이미지를 docker-compose로 DB 이미지랑 엮어서 실행
3. entrypoint.sh 의 `yarn start`이 실행되며 코드 실행
4. package.json의 start script를 보면 `nodemon` 이라고만 되어있음
5. `nodemon.json`에 `ts-node`를 활용해서 `./src/index.ts`를 실행하라고 셋팅해둠 ⭐️ (이렇게 nodemon으로 ts 파일 실행 가능하군!)

```json
// nodemon.json
{
  "watch": ["src"], // folder to watch for changes in code
  "ext": "js,ts,json", 
  "exec": "ts-node ./src/index.ts" // commandline to execute when running nodemon
}
```

 

### 18Feb22 (금) - SaveTabs DB 고민 

오전

1. 🤔 Q. using mongoDB with mongoose is same as RDBMS

https://stackoverflow.com/questions/45136094/what-is-the-benefit-of-using-mongoose-over-traditional-sql-schema-design



2. https://www.youtube.com/watch?v=duwlMwfEKQA&ab_channel=BenAwad

NoSQL :

schema-less - easy migration (needing to move your data when column of a table is changed)

"very scalable"

doesn't have joins - query a lot of data across multiple tables



Cassandra SQL : a lot like SQL, but doesn't have joins



Need a lot of DB design experience to use NoSQL, compared to PostgreSQL or MySQL



graph DB, DynamoDB



3. mongoDB + Mongoose 쓸 이유?

NoSQL 경험, high chance of changing the schema later, not much relations needed (at most one~two joins)

https://www.quora.com/What-is-the-benefit-of-using-Mongoose-over-a-%E2%80%9Ctraditional%E2%80%9D-SQL-schema-design





## Feb22 Week 4 - 21Jan22 ~ 27Feb22

### 21Feb22 (월) - Misc + Socket.io 코드

오전

- bash create folder only if it exists `mkdir -p dir` - https://stackoverflow.com/questions/793858/how-to-mkdir-only-if-a-directory-does-not-already-exist

- 에러) npm script에서 mkdir 안됨; 경로를 / 말고 \\\로 바꾸기 - https://stackoverflow.com/questions/41236078/why-does-mkdir-path-fails-in-npm-run-in-windows

- bash copy only files - https://unix.stackexchange.com/questions/101916/copy-only-regular-files-from-one-directory-to-another



오전~오후

- tsconfig - esModuleInterop - commonJS module.exports vs exports - commonJS default exports

ES6랑 commonJS랑 같이 쓰려니까 엄청 복잡하구나.. 그래서 package.js module 옵션으로 한가지만 쓸 수 있게 해논거고, tsc도 모듈을 commonjs로 변환할건지 ES6로 변환할건지 옵션으로 명시하게 한거군.



오후

- Server serving client files

- Socket.io cors, namespace 해결 🎉

- Socket.io behavior 연구

  - main namespace 연결 후, 안 끊고 다른 custom namespace에 연결해도 기존 연결 유지됨

  - on 'connection'시 걸어준 setInterval은 'disconnect' 이후에도 유지됨. 꼭 clearInterval 해주기 

- React + Typescript 코드 짜는법

패키지 설치 시, 혹은 @types/모듈 설치 시 패키지에서 사용하는 변수/함수는 알아서 타입 추론 됨.
변수 혹은 함수에 마우스 올려서 뜨는 parameter/return type들 보면서 typing (일일히 type 찾아보는거 아니야!)
필요한 type은 직접 interface로 만들기



저녁

- Re-ordering 설계에 따른 DB model 고민 (갤럭시탭 삼성노트) → Array 지원되는 mongoDB 써보자. N:M 간단하니까 reference 기능으로 충분할 듯



### 22Feb22 (화) - SaveTabs client-server 프로젝트 셋팅

오전

프로젝트 셋팅, CRLF 문제 (eslint prettier/prettier 설정으론 해결 안됨, VSCode CRLF 버튼 -> LF로 바꾸기), .eslint.js 설정

오후

`npx eslint .` 궁금증 (client, server 폴더에 각각 eslintrc 있는 경우 어떤걸 선택?)

- eslintrc.json의 `parserOptions.project` 의 경로는 eslint 실행시키는 터미널의 pwd을 root로 resolve; eslintrc.json이 위치한 폴더가 root이 아님 → eslintrc.js 로 바꾸고, `tsconfigRootDir: __dirname` 옵션 추가 (https://github.com/typescript-eslint/typescript-eslint/issues/540)



`tsc -p .` 하면 터미널의 pwd가 root (현 pwd에 tsconfig.json 없으면 에러뜸 - noEmit false, outDir 설정해두고 tsc 돌리면, include에 있던 파일들 모두 js로 transpile)

`.eslintignore`랑 `.prettierignore`는 프로젝트 가장 상위 directory에 놓아야 찾음
eslint랑 prettier랑 연결해두고 formatOnSave 해두었기에, eslintignore에만 추가해도 linting 안돼서 prettier 작동 안됨



SaveTabs - 프로젝트 셋팅

`npm i express express-session cookie-parser dotenv morgan cors`

`npm i -D nodemon ts-node @types/express @types/morgan`

`npm i mongoose winston`

root에서, `npm i -D concurrently`



SaveTabs - DB 설계

mongoDB



여러 router 혹은 db model들 index.ts에 import해서 여기서 한꺼번에 export 하기 = [re-exporting / aggregating](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#re-exporting_aggregating)
Ref) https://stackoverflow.com/questions/44583372/export-all-interfaces-types-from-one-file-in-typescript-project



Using default export is bad - import 시, 이름을 마음대로 바꿔서 코드 confusing하게 만듦

- https://writingjavascript.com/why-default-exports-are-bad#:~:text=Consistent%20naming%20is%20especially%20important,place%20that%20API%20is%20used.
- https://www.reddit.com/r/javascript/comments/hg3wl4/is_using_default_exports_considered_a_bad/



MongoDB는 schema-less. Mongoose에서 정해준 Schema는 Typescript typing 같은 역할임; 사용자가 type 잘 맞춰서 넣었나 체크만 해주는 것. 실제 MongoDB에 들어갈때는 schema-less로 자유롭게 들어감





### 23Feb22 (수) - git, react 공부

오전

BE 브랜치 작업 내용을 FE 브랜치로 merge? rebase?

git pull, git fetch, origin/master vs origin master



오후

Robin Wieruch 라는 독일 SWE 블로그에서 양질의 React 글 읽으며 공부



#### Robin Wieruch - React fetch data

[How to fetch data in React - Class components](https://www.robinwieruch.de/react-fetching-data/)

[How to fetch data with React Hooks - ⭐️ 위 개념을 Hooks로 설명 + useReducer](https://www.robinwieruch.de/react-hooks-fetch-data/)

state 관리 참고) 

(❗ 아직 안봄) [useReducer vs useState in React](https://www.robinwieruch.de/react-usereducer-vs-usestate/#when-to-use-usestate-or-usereducer)

(❗) [React State Hooks: useReducer, useState, useContext - ⭐️ 상황에 따라 셋을 잘 설명](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/?utm_campaign=Robin%20Wieruch%20-%20A%20Developer%27s%20Newsletter&utm_medium=email&utm_source=Revue%20newsletter)

(❗) https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer#



#### Robin Wieruch - React HOC

다른 component를 input으로 받아서 특정 조건 추가한 다음 (conditional rendering 구현을 위해), 업그레이드 된 component 반환하는 higher-order function (React라서 higher-order component라고 부르는 것)

[React Higher Order Components](https://www.robinwieruch.de/react-higher-order-components/)

[Why React Hooks over HOCs](https://www.robinwieruch.de/react-hooks-higher-order-components/) - Hook이 나오고 나선 HOC를 사용할 일이 없어졌다고 한다 ([Ref](https://react.vlpt.us/redux/09-connect.html#:~:text=%EB%95%8C%EB%AC%B8%EC%97%90%2C%20%EB%8B%A4%EB%A4%84%EB%B3%B4%EB%8F%84%EB%A1%9D%20%ED%95%98%EA%B2%A0%EC%8A%B5%EB%8B%88%EB%8B%A4.-,HOC%EB%9E%80%3F,-connect%EB%8A%94%20HOC))



#### Robin Wieruch - React 기타

(❗) [How to learn framework - React, Angular or Vue (공부법)](https://www.robinwieruch.de/how-to-learn-framework/)

(❗) [React Conditional Rendering](https://www.robinwieruch.de/conditional-rendering-react/)

(❗) [Recent React Patterns & Concepts - Aug 2021](https://www.getrevue.co/profile/rwieruch/issues/react-patterns-concepts-650084)



#### ✨ 상태관리(Redux)는 언제 필요할까?

#### https://www.freecodecamp.org/news/the-road-to-redux-and-back-d9987c7bb894/

그림 보기

(원래) List 내의 item 선택 시, state가 바뀌고 그게 Container를 통해 Details로 넘어가서 표시되는 내용이 바뀜

(filter 컴포넌트와 Subcontainer 추가 후) Filter나 List에 의해 바뀐 state가 Subcontainer까지만 전달되고, Container를 거쳐서 Details까지 전달해주려면 must go through a lot of hassle

→ 모든 컴포넌트가 접근 가능한 state container인 'Store'에 중요한 state 넣고 관리, 각 컴포넌트는 Store의 '특정' state가 바뀔때만 re-render

→ action 설계, reducer 정의 등 여러 복잡한 과정 필요하고, 버그 생기면 봐야할 곳이 너무 많음. 그래서 글은 ES6 spread syntax 써서 일일히 props 넘겨주라고 하지만, [React Context](https://beta.reactjs.org/learn/passing-data-deeply-with-context) 활용할 수도 있을 듯. 이런 docs guide도 있네 - [Scaling Up with Reducer and Context](https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context)



