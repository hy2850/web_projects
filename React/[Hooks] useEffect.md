useEffect - runs 'after' render
![](https://blog.kakaocdn.net/dn/eFC5OT/btqXwdg7gIx/RrXfz887pljat4sRFebgr0/img.gif)

원래 default값으로 일단 렌더링 된 후, useEffect에 의해 프로그래머에 의해 세팅된 값으로 초기화되는 구조라, render~useEffect 사이에 dummy 값이 유저에게 보여짐
-> 방지법? useLayoutEffect
https://merrily-code.tistory.com/46

<br>

---
useEffect가 여러 개 있을 시, top->down 순서 따른다.

* useEffect call order에 대한 매우 자세한 article
[Call order](https://blog.logrocket.com/post-hooks-guide-react-call-order/#:~:text=this%20won%E2%80%99t%20happen.-,Call%20order,-Now%20that%20we "The post-Hooks guide to React call order - LogRocket Blog")