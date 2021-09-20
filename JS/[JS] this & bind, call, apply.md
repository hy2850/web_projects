CS492 FE개발 2강 Core JS p.84 공부하다가, Obj 메소드의 this가 window가 아닌 obj를 지칭하는 것을 봤다. 
https://stackoverflow.com/a/22026340/9720700



https://javascript.info/object-methods#this-in-methods

💡 The value of `this` is evaluated during the run-time, depending on the context.

```js
var test = {
	message:"Hello",
	click: ()=>{console.log(this)},
	click2: function(){
		console.log(this)
	}
}
test.click() // window
test.click2() // test
```

* Obj 메소드(function으로 정의된 일반함수)에서 this는 obj 가리킨다.

* Arrow function의 경우, 상위 'normal function' context에서 this를 자동으로 가져오기 때문에, this 출력 시 window라고 뜬다.

관련 내용 정리한 doc) https://javascript.info/object-methods#arrow-functions-have-no-this

> Arrow functions are special: they don’t have their “own” `this`. 
> If we reference `this` from such a function, it’s taken from the outer “normal” function.

```js
var test = {
	message:"Hello",
	click: function(){
	  let innerF = ()=>{console.log(this)}; // take 'this' from outer normal function - method 'click'
	  innerF();
    }
    click2: ()=>{
	  let innerF = ()=>{console.log(this)}; // No outer normal function - `this` refers to global window
	  innerF();
    }
}
test.click() // test
test.click2() // window
```



---

## this를 활용하는 event handler 등록 및 제거 시 bind가 일으키는 문제

![removeEvent, this and bind](.\img\removeEvent, this and bind.jpg)

CS492 FE개발 2강 Core JS p.84 중

addEventListener의 콜백으로 onClick을 넘겨줄때 그냥 넘겨주면, this가 global window로 잡혀서 에러가 남.
그래서 bind를 써서 this = clickWindow로 묶어주는건데, 이것 때문에 removeEventListener가 작동 안됨.



해결법? 아래 글을 보면서 따라서 코딩해보자 (그래야 가장 잘 이해됨)
[HTML saves - removeEventListener, this 동작 (with bind)](https://mygumi.tistory.com/332)

<details>
  <summary>Click to expand!</summary>

1. 함수 바깥의 다른 context를 this로 등록하기
    ```js
    const btn = (()=>{
      function addEvents(){
        console.log(this); // window (class Button이 되길 바랐는데)
        this.elem.addEventListener("click", this.clickHandler) // error
      }
    
      return class Button {
        constructor(){
          this.elem = document.createElement("button");
          addEvents(); // 해결 방법 → addEvents.call(this);
        }
    
        clickHandler(){
          console.log("Click!!");
        }
      };
    })();
    const b = new btn();
    ```

2. 헷갈리는 콜백 context - console.log(this)로 찍어가면서
    ```js
    const btn = (()=>{
      function addEvents(){
        this.elem.addEventListener("click", this.clickHandler)
      }
    
      return class Button {
        constructor(){
          this.elem = document.createElement("button");
          addEvents.call(this);
        }
    
        clickHandler(){
          console.log("Click!!");
          console.log(this); // this = addEventListener의 타겟인 this.elem (button 엘리먼트; <button/>)
          this.obj["a"] += 1; // error; cannot find 'obj' in '<button/>'
        }
      };
    })();
    const b = new btn();
    b.elem.dispatchEvent(new Event("click")); // ★ (새로운거 배움) 해당 EventTarget에 이벤트 일으키기 
    
    
    // 수정 후
    const btn = (()=>{
      function addEvents(){
        this.elem.addEventListener("click", this.clickHandler.bind(this)); // context 고정 : this (= Button) bind
      }
    
      return class Button {
        constructor(){
          this.elem = document.createElement("button");
          this.obj = { // 새로 만듦
            a: 1
          };
          addEvents.call(this);
        }
    
        clickHandler(){
          console.log("Click!!");
          this.obj["a"] += 1;
        }
      };
    })();
    const b = new btn();
    b.elem.dispatchEvent(new Event("click")); // {a: 2}
    b.elem.dispatchEvent(new Event("click")); // {a: 3}
    b.obj // {a: 3}
    ```
    
3. bind된 clickHandler 제거 - removeEventListener
   ```js
   const btn = (()=>{
     function addEvents(){
       this.elem.addEventListener("click", this.clickHandler.bind(this)); // ★ bind = 새로운 함수 인스턴스 반환
     }
   
     function removeEvents(){
       this.elem.removeEventListener("click", this.clickHandler.bind(this)); // ★ 위에서 add된 함수와 다름; 해제X
     }
   
     return class Button {
       constructor(){
         this.elem = document.createElement("button");
         this.obj = {
           a: 1
         };
         this.clickHandler = this.clickHandler.bind(this);
         addEvents.call(this);
       }
   
       clickHandler(){
         console.log("Click!!");
         this.obj["a"] += 1;
       }
   
       destroyed(){
         removeEvents.call(this); 
       }
     };
   })();
   const b = new btn();
   b.elem.dispatchEvent(new Event("click")); // {a: 2}
   b.destroyed();
   b.elem.dispatchEvent(new Event("click")); // {a: 3} - clickHandler 제거 안됨
   b.obj // {a: 3}
   
   
   // 수정 후
   const btn = (()=>{
     function addEvents(){
       this.elem.addEventListener("click", this.clickHandler); //
     }
   
     function removeEvents(){
       this.elem.removeEventListener("click", this.clickHandler); //
     }
   
     return class Button {
       constructor(){
         this.elem = document.createElement("button");
         this.obj = {
           a: 1
         };
         this.clickHandler = this.clickHandler.bind(this); // ★ bind한 함수를 미리 할당해두고 그거 공유
         addEvents.call(this);
       }
   
       clickHandler(){
         console.log("Click!!");
         this.obj["a"] += 1;
       }
   
       destroyed(){
         removeEvents.call(this); 
       }
     };
   })();
   const b = new btn();
   b.elem.dispatchEvent(new Event("click")); // {a: 2}
   b.destroyed();
   b.elem.dispatchEvent(new Event("click")); // {a: 2} - event 안 일어남.
   b.obj // {a: 2}
   ```
   </details>



