민감한 정보를 개발 코드에 하드코딩 하면 노출됨.
다른 파일에 환경 변수로 세팅해서 코드로부터 분리하고, 앱에서는 이 환경 변수들을 불러와 사용
https://poiemaweb.com/nodejs-keeping-secrets

읽어봄직한 꿀팁
https://velog.io/@public_danuel/process-env-on-node-js

<br>

dotenv 
: .env 파일에서 개발자가 세팅해놓은 환경변수들을 읽어서 process.env에 자동으로 import 시켜주는 모듈 
사용법 https://www.daleseo.com/js-dotenv/

기본적으로 경로는 root폴더의 .env를 참조하나, 경로 변경도 가능
https://stackoverflow.com/questions/42335016/dotenv-file-is-not-loading-environment-variables
relative path는 받지 않는 듯 하다
https://dev.to/eriesgo/dotenv-and-relative-paths-fp2

<br><br>

React에서 쓸때 주의사항
https://stackoverflow.com/questions/49579028/adding-an-env-file-to-react-project
'REACT_APP_'을 환경변수 이름 앞에 꼭 붙여주기
+ 환경 변수 로딩 제대로 안되면 app restart