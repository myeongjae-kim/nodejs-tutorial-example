# Node.js Tutorial Example

[Node.js Tutorial with Clean Architecture](https://nodejs.myeongjae.kim) 과정의 예시 프로젝트입니다.

## 프로젝트 초기화 및 실행

```bash
$ npm install -g pnpm # PNPM 설치: https://pnpm.io/installation
$ pnpm install -g @microsoft/rush # Rush 설치: https://rushjs.io/pages/intro/get_started/
$ pnpm install -g @rushstack/heft # Heft 설치: https://rushstack.io/pages/heft_tutorials/getting_started/
$ git clone https://github.com/myeongjae-kim/nodejs-tutorial-example
$ cd nodejs-tutorial-example
nodejs-tutorial-example$ rush install
nodejs-tutorial-example$ rush update
nodejs-tutorial-example$ rush build
nodejs-tutorial-example$ rush deploy
nodejs-tutorial-example$ cd common/deploy/app/board-cli
nodejs-tutorial-example/common/deploy/app/board-cli$ rushx start # pnpm start, npm run start, yarn start 모두 가능
1) 목록 조회
2) 쓰기
x) 종료

선택:
```
