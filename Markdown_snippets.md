Markdown is not meant as a tool for layout, it is meant to simplify the process of writing for the web ([출저](https://stackoverflow.com/questions/6046263/how-to-indent-a-few-lines-in-markdown-markup))
= 복잡한 layout이 필요하면 티스토리 같은 블로그 사용. 마크다운은 간편한 필기 용도 정도로

<br>

잘 정리된 블로그
http://taewan.kim/post/markdown/#link

---
# 자주쓰는 Markdown snippet
* 들여쓰기 (Indent)
  Obsidian에서는 그냥 Space 누르니까 알아서 맞춰지던데?
  안된다면 ```&nbsp; (1칸) 혹은 &emsp; (3칸)``` 노가다 ([참고](https://stackoverflow.com/questions/6046263/how-to-indent-a-few-lines-in-markdown-markup))

  ex) 하이&emsp;호&nbsp;호

<br>

* newLine
```
<br>
혹은
\
&nbsp;
```

<br>

* 수평선
```---```

<br>

* 링크
[GOOGLE](http://www.google.co.kr/)
[NAVER](https://naver.com/ "타이틀 문구")
<https://github.com/>

<br>

* 색깔
<span style="color:red">빨</span>
<span style="color:blue">파</span>

<br>

* [접은 글](https://gist.github.com/pierrejoubert73/902cc94d79424356a8d20be2b382e1ab) - Obsidian에서는 안보이는데, VS code 같은걸로 열어보면 잘 적용되어있음

<details>
  <summary>Click to expand!</summary>

  ## Heading
  1. A numbered
  2. list
     * With some
     * Sub bullets
     </details>

<br>

* 취소선
~~취소~~

<br>

* 밑줄 (underline)

  <u>밑줄 예시</u>

<br>

## Center align
<center>Centered text</center>

https://stackoverflow.com/questions/14051715/markdown-native-text-alignment




---
# 기타

Makrdown project directory tree generator

https://woochanleee.github.io/project-tree-generator/



(Converting to PDF) Add page break

https://github.com/typora/typora-issues/issues/118

`<div style="page-break-after: always;"></div>`



### 정적 블로그 만들기

지킬([Jekyll](https://jekyllrb.com/))과 헥소([Hexo](https://hexo.io/ko/index.html))

다음엔 지킬보다는 헥소를 한번 써볼까
[헥소로 블로그 만들기](https://velog.io/@recordboy/%ED%97%A5%EC%86%8CHEXO%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EA%B9%83%ED%97%88%EB%B8%8C-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0)
[핵소 포스팅 scaffold](https://pictureyou-neo.github.io/2020/09/21/hexo-markdown-troubleshooting-fix-change/)