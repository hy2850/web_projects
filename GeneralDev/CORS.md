

# CORS (Cross-origin resource sharing)

Web browsers enforce CORS policy (**same-origin policy** by default) that allow requests only from certain origins, for security reasons.



### Same-origin policy (SOP)란?

Default CORS policy; Server only accept requests from the same origin

>  In [computing](https://en.wikipedia.org/wiki/Computing), the **same-origin policy** (sometimes abbreviated as **SOP**) is an important concept in the web application [security model](https://en.wikipedia.org/wiki/Computer_security_model). Under the policy, a [web browser](https://en.wikipedia.org/wiki/Web_browser_engine) permits scripts contained in a first web page to access data in a second web page, but only if both web pages have the same *origin*.
>
> - Wikipedia (https://en.wikipedia.org/wiki/Same-origin_policy)



Setting custom CORS policy <span style="color:red">relaxes </span>SOP, allowing requests from other foreign sources. 

확실히 자기 서버가 아닌 다른 서버에 req 보내는게 경계할만한 일이긴 하네. 자기 서버에 HTML, 이미지 같은거 요청하는 정도면 충분한데



## Why is same-origin policy needed?

Imagine a Chrome browser full of tabs each loading a webpage from different origins. Some of them contains important private info such as bank account, passwords, and etc.

Malicious website on one tab tries to execute javascript code to read info from other tabs. All your info will be hijacked!
→ SOP stops javascript code from foreign origin reading info from your other origins, keeping your info safe.

아님 페이지A (피싱 사이트) 내부에 iframe 형태로 페이지B(은행)를 띄우는 상황을 생각. A에서 JS script 실행시켜서 B의 DOM 내용 (은행 정보, 비밀번호) 다 빼가면 안되잖아. 서로 domain 달라서 reading request access 안되도록 하는게 SOP.

Ref)
https://www.youtube.com/watch?v=-BUMW6HbYgc
https://security.stackexchange.com/questions/80306/how-does-the-same-origin-policy-apply-between-browser-tabs

https://security.stackexchange.com/questions/8264/why-is-the-same-origin-policy-so-important
https://security.stackexchange.com/questions/108835/how-does-cors-prevent-xss

CORS is then needed to relax this SOP





## How does it work? 작동 방식

클라이언트 쪽에서 preflight 요청 (Method OPTIONS) 먼저 보내면, 서버에서 response header에 `Access-Control-Allow-Origin : 허용된 도메인` 포함해서 알려줌.
이후 main request 보낼 때, domain 다르면 CORS policy 위반으로 access deny, error 처리
[참고 - evan moon 굿](https://evan-moon.github.io/2020/05/21/about-cors/#cors%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%8F%99%EC%9E%91%ED%95%98%EB%82%98%EC%9A%94) [참고2](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests)





## Questions

💡 read 요청이 아닌 script src, img 요청 같은건 SOP 체크 안하나봄
Req 헤더에 `Sec-Fetch-Mode: no-cors` 포함 → 다른 출처라고 해도 CORS 정책 위반 여부를 검사하지 않는다
[출저 1](https://evan-moon.github.io/2020/05/21/about-cors/#%EC%9A%94%EC%B2%AD%EC%9D%84-img-%ED%83%9C%EA%B7%B8%EC%97%90-%EB%84%A3%EC%9C%BC%EB%A9%B4-%EC%96%B4%EB%96%A8%EA%B9%8C) [출저 2](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#cross-origin_network_access)
https://web.dev/same-origin-policy/#what-is-permitted-and-what-is-blocked



💡 server → server requests are not blocked by SOP?
**CORS rules are enforced by browser** → server to server request is never blocked by CORS
https://stackoverflow.com/questions/65373878/cors-client-side-vs-server-side
https://stackoverflow.com/questions/61692082/why-cross-origin-resource-sharing-cors-does-not-block-on-server-side





## Ref

- 읽을 만한 ref - [Tistory에 저장](https://goldenriver42.tistory.com/256)
- NodeJS 공부하다가 10.7 단원 CORS 정리 
  https://github.com/hy2850/NodeJS_study/issues/4
- Notion에 정리한 SOP 때문에 'React → 서버' request 막힌 경험
  https://www.notion.so/CORS-6d3cc24b195f477eb2757a1da4789c79

- SOP 보완 → CSP (Solution to XSS?) - [링크](https://web.dev/same-origin-policy/#:~:text=%22But%20wait%2C%22%20you,Content%20Security%20Policy.)

  