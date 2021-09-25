JS는 fetch, 파이썬은 requests 라이브러리 사용 ([매우 잘 설명한 DaleSeo님 블로그글](https://www.daleseo.com/python-requests/))



Resource : URI (서버 주소)
Verb : HTTP 메소드 (GET, POST, PUT, DELETE)
Representation



### 데이터 보내기

[GET] Query string - Parameters in URL

`https://httpbin.org/get?key2=value2&key1=value1`

```js
// JS https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
let payload = { foo: 'value', bar: 2 };
fetch('https://httpbin.org/get?' + new URLSearchParams(payload))
// https://httpbin.org/get?foo=value2&bar=2
```

```python
# Py3 https://docs.python-requests.org/en/latest/user/quickstart/#passing-parameters-in-urls
payload = { 'foo': 'value', 'bar': 2 }
res = requests.get('https://httpbin.org/get', params=payload)
print(res.url) # https://httpbin.org/get?foo=value2&bar=2
```



[POST, PUT] Pass body

```JS
// JS
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
    .then((response) => response.json())
    .then((json) => console.log(json));
```

```python
# Py3
requests.post("https://jsonplaceholder.typicode.com/users", data={'name': 'Test User'}) # Content-Type : application/x-www-form-urlencoded
requests.post("https://jsonplaceholder.typicode.com/users", json={'name': 'Test User'}) # Content-Type : application/json
```



