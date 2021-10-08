HTML saves - Event loop 참고
✨ https://chanyeong.com/blog/post/44
https://prohannah.tistory.com/59

(매우 간단히 정리 - 더 파고드는건 아래에)

JS 런타임 (NodeJS 혹은 브라우저)이 내 JS 코드 실행.

함수 호출하면, 우선 런타임의 callstack에 저장.

런타임의 메인 쓰레드 (single-thread, 이벤트 루프라고도 부름)가 callstack에 저장된 함수 꺼내서 실행.

근데, setTimeout, fetch 같은 오래 대기해야 하는 함수 실행하면, 하나뿐인 메인 쓰레드가 대기하느라 프로그램이 먹통이 되어버림
(blocking operation 문제점)

이런 여러 blocking 이벤트는 메인 쓰레드가 아닌,  '워커'라는 멀티쓰레드에 넘겨서 처리함.



근데, 멀티쓰레드로 처리한 이벤트를이 콜백 함수를 가지고 있다면?  

→ task queue (callback queue) + 이벤트 루프 개념이 여기서 등장.
멀티쓰레드로 처리한 이벤트들은 종료 후 실행할 콜백 함수를 task queue에 저장해뒀다가, 싱글 쓰레드 메인 프로그램이 끝나면 이벤트 루프에 의해 메인 callstack으로 옮겨져 메인 쓰레드에 의해 처리됨.

즉, 결국 모든 명령어는 메인 쓰레드 하나에 의해 순차적으로 처리되고, 비동기 이벤트 처리 (Asynchronous, non-blocking)를 위해 queue + 이벤트 루프 구조를 선택한 것. I/O 처리가 잦은 웹의 성격상, 동시성(Concurrency) 구현을 위해 I/O는 멀티쓰레드로 맡긴 것으로 볼 수도 있다.

Q. 그럼 메인 쓰레드까지 멀티 쓰레딩 하지, 왜 단일 쓰레드로?
→ 멀티 쓰레딩 시 나타나는 여러 문제점 (스케쥴링, 동기화, 데드락 등) 때문에, 그냥 단일 쓰레드로 타협본 듯.
속도를 희생한 대신, 간편함을 얻었음. 이 간편함을 바탕으로 여러 프로그래머들이 다양한 어플리케이션을 짜서 엄청난 확장성을 가지게 됬다고 볼 수 있겠다.



또 다른 참고할만한 자료)
자바스크립트 호출 스택(Call Stack) 이해하기 - runtime, stack, event queue 등 개념

[자바스크립트 호출 스택(Call Stack) 이해하기](https://new93helloworld.tistory.com/358)
[자바스크립트 호출 스택(Call Stack) 동작 예제](https://new93helloworld.tistory.com/361?category=765705)



---

#### NodeJS 공부하며 추가

*NodeJS process is not “single-threaded”. “Event loop” is single-threaded.* [(출저)](https://chaudharypulkit93.medium.com/how-does-nodejs-work-beginner-to-advanced-event-loop-v8-engine-libuv-threadpool-bbe9b41b5bdd#:~:text=NodeJS%20process%20is%20not%20%E2%80%9Csingle-threaded%E2%80%9D.%20%E2%80%9CEvent%20loop%E2%80%9D%20is%20single-threaded.)

“Event Loop” is some piece of code in a loop which picks up tasks from “Job/Task Queue” and sends them to V8 (메인 쓰레드) to be executed.

“Job Queue” is a FIFO(first-in-first-out) data structure which is just used to store some data(or “tasks”).

A “task” is nothing but some code inside a function that needs to be executed. (= callback)

💡 여기서 헷갈릴 수 있는데, 메인 쓰레드 = 이벤트 루프임.
메인 쓰레드가 콜스택이 비어있으면 queue 뒤져서 콜스택으로 가져오는 것.

The “tasks” keep getting pushed to the end of the array and they keep getting picked up by the “Event Loop” from the start of the array.
A “task” enters the queue when a callback function is called after an I/O operation, setTimeout, setInterval, setImmediate, or an OS task complete.



시각적으로 event loop를 가장 잘 설명 : https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=1432s&ab_channel=JSConf

javascript 'runtime' = single call stack = single thread = one thing at a time

asynchronous 하게 작동하는게 필요한 함수들 (ex. setTimeout, fetch) : V8 메인 쓰레드 (= 이벤트 루프)가 아닌, libuv에서 제공하는 worker 쓰레드들 혹은 시스템 커널 쓰레드에게(주로 setTimeout, fetch 같은 시스템에서 지원하는 API 호출 시) 넘겨져 실행됨 [(출저)](https://medium.com/@gwakhyoeun/%EC%99%9C-node-js%EB%8A%94-single-thread-%EC%9D%B8%EA%B0%80-bb68434027a3). 실행 끝나면 callback을 task queue에 밀어넣음.

event loop는 callstack이 빌때 (메인 프로그램들 다 실행하고 끝났을 때), task queue에 있는 함수들을 callstack으로 옮긺. 

runtime 메인 쓰레드(= 얘가 이벤트 루프)는 callstack으로 들어오는 함수들을 실행.



callback 함수에 또 다른 엄청 오래 걸리는 함수 넣으면, 그거 또 실행하는 중엔 event loop block 되므로 브라우저 반응 막힘.
call stack - event loop - callback queue의 관계를 잘 이해해야 성능 최적화 할 수 있다. 



🔥 그럼 node = single thread 맞잖아? 메인 쓰레드는 한번에 하나씩만 실행 가능하니까
그냥 non-blocking, asynchronous single thread일 뿐이지.



결론) Javascript는 프로그래밍 언어. JS가 single thread냐 multi-thread냐고 묻는건 잘못됐음.

JS runtime (ex. Node.js) 이 callstack 하나로 돌아가는 single-thread 구조 (main thread 하나가 callstack에서 함수 하나씩 꺼내서 실행시킴 - event loop라고도 부름)

single thread라 실행 마칠때까지 오래 기다려야 하는 blocking 명령 한번 실행되면 브라우저가 마비됨.
→ libuv에 의해 커널 혹은 threadpool의 쓰레드에게 넘겨서 대신 처리 
→ 끝나고 만약 콜백 함수를 실행해야 하는 경우엔, callback queue로 넘김
→ 이벤트 루프는 callstack이 비었을 때 callback queue에서 함수를 하나 꺼내서 callstack에 넣음.
→ 메인 쓰레드가 callstack에 들어온 함수 꺼내서 실행

즉, runtime 자체는 single-threaded지만, async 명령을 처리하는 다른 쓰레드 + callback queue에서 callstack으로 함수를 옮기는 이벤트 루프 덕에 asynchronous 명령을 처리하는 concurrency 구현 가능

![](./img/Eventloop_NodeJS_architecture.jfif)



Q. libuv가 정확히 뭘 하는지. threadpool이 libuv인가? 
아니면 blocking operation 들어오면 이걸 커널에서 제공하는 web API에게 맡길지, 아니면 threadpool의 쓰레드에게 넘겨서 실행할지 결정하는건가?
web API에 맡긴하고 해도, 결국 쓰레드에 넣어서 실행해야 하는거잖아
→ threadpool도 제공하고, 후자의 역할도 함.
web API를 호출할때는, threadpool의 워커 쓰레드가 아닌 커널 쓰레드를 사용하는 듯.

✨Q. 이벤트 루프 = 메인 쓰레드?
→ 둘이 같은 개념임.
메인 쓰레드 = V8 event loop
메인 쓰레드가, 만약 callstack이 비어있으면 callback queue 뒤져보는 것



Ref

⭐강추 영상
https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=1432s&ab_channel=JSConf

(job queue 설명 전까지 읽을만 함) How does NodeJS work(Beginner to Advanced)? — Event Loop + V8 Engine + libuv threadpool
https://chaudharypulkit93.medium.com/how-does-nodejs-work-beginner-to-advanced-event-loop-v8-engine-libuv-threadpool-bbe9b41b5bdd

Is NodeJS a programming language? Framework? -> No! It's a runtime.
https://effectussoftware.com/blog/node-js-a-framework/

What exactly is Node.js? - 그림 볼만 함 + blocking, events, npm, v8 등 NodeJS 관련 기본 개념 설명
https://www.freecodecamp.org/news/what-exactly-is-node-js-ae36e97449f5/

(한국어 블로그) Node.js의 이벤트루프와 libuv의 이해 - ⭐libuv의 코드 뜯어서 설명
https://m.blog.naver.com/pjt3591oo/221976414901
또 다른 내부 동작 그림 (⭐그림 강추 - 아마 이게 가장 정확)
https://sjh836.tistory.com/149
Node.js 내부 아키텍쳐 그림 - 가장 윗단이 Node.js API로서, 어플리케이션에 기능 제공 (그 아래에 Node.js 코어 + V8 + libuv 등 돌아감)
https://kyun2da.dev/javascript/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%9F%B0%ED%83%80%EC%9E%84-node.js/



---

Q. NodeJS가 아닌 일반 브라우저에서 js 코드 돌릴때도 이 구조가 성립함?
→ ㅇㅇ 구조 개념은 동일함. 다만 크롬은 libuv가 아닌, libevent라는 event loop를 사용한대.
https://stackoverflow.com/questions/25750884/are-there-significant-differences-between-the-chrome-browser-event-loop-versus-t

