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

3. just use nodemon
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