# postgresql + typeORM + typescript + graphql 활용한 Backend 구성하기

## typescript + graphql.

### backend 폴더 생성하자.

> 백엔드 서비스를 위한 루트 디렉토리를 만들자. 이름은 _'backend'_ 이다.

```
    workspace> mkdir backend
```

### package.json 파일 생성하자.

> 백엔드 디렉토리 안에서 _npm init_ 명령을 사용해 node 기반 서비스를 구성하기 시작함을 알리자.

```
    workspace/backend> npm init
```

<img src="/workspace/devlog/interpark/postgresql_typeorm_typescript_graphql/res/1.png">

### 필요한 package 들을 설치하자.

> 그렇다면 위의 이미지와 같이 node 서비스에서 기본적으로 필요한 package.json 파일을 생성하기 위해서 많은 것들을 물어본다. 모두 Enter를 눌러서 무시해주자. <br><br> 이제 postgresql + typeORM + typescript + graphql 기술들을 사용하기 위해서 필요한 라이브러리, 모듈, 패키지들을 npm을 활용해 설치할 것이다. backend 폴더로 이동한 이후 아래의 명령어를 입력하자.

```
    workspace/backend> npm install graphql-to-typescript graphql-tools graphql-yoga nodemon ts-node tslint-config-prettier babel-runtime typescript
```

<img src="/workspace/devlog/interpark/postgresql_typeorm_typescript_graphql/res/2.png">

> 만약 설치가 잘 완료되었다면 _'package.json'_ 파일 안에 _'dependencies'_ 항목이 생기는데 위와같이 그 항목 안에 우리가 설치한 패키지들을 확인할 수 있다. 그 다음으로는 프로덕션 환경이 아닌 개발 환경에서만 사용할 패키지를 설치할 것이다. backend 폴더로 이동하여 아래와 같이 명령어를 입력하자. 

```
    workspace/backend> npm install --save-dev @types/node
```

> --save-dev 속성을 넣어주게되면 해당 패키지는 개발 환경의 의존성으로만 추가가 되며 package.json 에도 dependencies 항목이 아닌 devDependencies 항목에 추가가 된다.

<img src="/workspace/devlog/interpark/postgresql_typeorm_typescript_graphql/res/3.png">

### 각 package들의 역할을 간략하게 알아보자.

> 각 패키지들의 역할을 간략하게나마 소개하자면 아래와 같다.

#### graphql-to-typescript

> type, resolver와 같은 graphql 관련 타입들을 typescript 문법이 이해할수 있는 타입으로 변환할 수 있게 도와주는 패키지이다.

#### graphql-tools

> schema와 resolver를 분리해주는 구조를 만들어 주는 패키지라고 하는데 잘 모르겠다.

#### graphql-yoga

> React에서 _'create-react-app'_과 같이 손쉽게 graphql 설치를 할 수 있도록 도와주는 graphql 종합 패키지라고 보면 될 것 같다. 이 패키지를 설치하게 되면. 실제 서버의 역할을 해주는 _'express'_, _'apollo server'_ 패키지와 graphql 핵심 기능을 담고 있는 _'graphql.js'_, 위에서 설명한 _'graphql-tools'_, 그리고 웹 환경에서 GUI로 REQ/RES를 테스트할 수 있는 _'graphql-playground'_와 같은 IDE 등이 종합적으로 제공된다.

#### nodemon

> 서버가 실행중일 때 코드에 어떤 수정사항이 생기면 바로 적용할 수 있도록 도와주는 패키지이다.

#### babel-runtime

> Babel은 기본적으로 ES6/ES7 코드를 ECMAScript5 코드로 트랜스파일링하기 위한 도구이다.

#### ts-node

> 타입스크립트에서는 타입스크립트를 자바스크립트로 변환해주는 tsc 라는 도구를 제공한다. 이 도구를 이용하면 타입스크립트 코드가 그와 같은 기능을 하는 자바스크립트 코드로 변경되는데 이 과정을 transpile 이라 한다. 그러나 코드 수정이 일어날 때마다 매번 transpiling 작업을 하게되면 작업속도가 현저히 느려질 수 밖에 없는데 그래서 ts-node는 메모리상에서 타입스크립트를 transpiling 하여 바로 실행할 수 있게 한다.

#### tslint-config-prettier

> tslint는 typescript 언어를 작성할 때 코드 표준 규칙들을 잘 준수하고 있는지 체크해주는 정적 코드 분석 도구이며 prettier는 vscode에서 코드를 정리해주는 패키지이다.

#### typescript

> typescript 언어는 트랜스파일링 언어로 코드 작성 완료후 트랜스파일링 작업을 진행해야 하는데 이 패키지에 있는 tsc 도구 등을 통해 자바스크립트로 변환이 가능하다. java에서 jdk같은 느낌으로 받아들이자.

### '.gitignore' 파일을 생성해 git에 올릴 파일을 조절해보자.

> git commit/push 전에 node_modules 폴더 내부를 보자. 우리가 설치한 패키지들 고작 몇개인데 그것들로 인해 node_modules 폴더는 수많은 파일들로 가득 차있다. 이 파일들도 git에 올리게 되면 참 고생길이 훤할 것이다. 또 정작 실제 소스들도 아님으로 그렇게 중요한 파일들은 아니다. git 업로드 내용에 제거하기 위해서 _'backend'_ 폴더 내부에 _'.gitignore'_ 파일을 생성하자. 그리고 그 안에 node_modules 라고 적자.

```
    workspace/backend> touch .gitignore
```

#### .gitignore
```
    node_modules
```

<img src="/workspace/devlog/interpark/postgresql_typeorm_typescript_graphql/res/4.png">

> 이렇게 하면 node_modules 폴더에 해당하는 파일들을 git remote repository로 업로드 되지 않는다.

### typescript + graphql 환경설정 파일들 생성 및 작성해보자

> 우선 typescript + graphql 기술들을 활용한 backend 환경을 구성하기 위해 필요한 설정 파일들을 만들자. 하나 알아둘 것은 현재 설치한 node package 들 중에 typeORM과 관련된 항목은 없는데 이는 이후에 관련된 package 들을 추가로 설치할 것이다. <br><br> backend 폴더에서 아래 4개의 파일을 만든다.

```

    workspace/backend> touch nodemon.json
    workspace/backend> touch tsconfig.json
    workspace/backend> touch tslint.json
    workspace/backend> touch .babelrc

```

> 각 파일들에 들어가야할 내용들은 아래와 같다. 파일이름이 헷갈리지 말고 각 내용들을 복사, 붙여넣기하자.

#### nodemon.json

```json

    {
      "ext": "ts graphql"
    } 

```

> 위 파일 _'nodemon.json'_ 에서 _"ext"_ 속성은 확장자를 의미하는데 그 속성값으로 적혀있는 확장자의 코드가 (여기서는 ts와 graphql) 수정될 경우 프로젝트는 새로고침된다.

#### tsconfig.json

```json

{
    "compilerOptions": {
      "baseUrl": ".",
      "module": "commonjs",
      "target": "es5",
      "lib": ["es6", "dom", "esnext.asynciterable"],
      "sourceMap": true,
      "allowJs": true,
      "moduleResolution": "node",
      "rootDir": "src",
      "forceConsistentCasingInFileNames": true,
      "noImplicitReturns": true,
      "noImplicitThis": true,
      "noImplicitAny": false,
      "strictNullChecks": true,
      "suppressImplicitAnyIndexErrors": true,
      "noUnusedLocals": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true,
    },
    "exclude": [
      "node_modules",
      "build",
      "scripts",
      "acceptance-tests",
      "webpack",
      "jest",
      "src/setupTests.ts"
    ]
}

```

> tsconfig.json은 typescript가 js 파일로 transpiling 할 때 고려되어지는 설정 정보들을 담고있는 파일 같다. 자세히는 모르겠다.

#### tslint.json

```json

{
    "extends": ["tslint:recommended", "tslint-config-prettier"],
    "linterOptions": {
      "exclude": ["config/**/*.js", "node_modules/**/*."]
    },
    "rules": {
      "no-console": false,
      "member-access": false,
      "object-literal-sort-keys": false,
      "ordered-imports": true,
      "interface-name": false,
      "strict-null-checks": false
    },
    "rulesDirectory": []
  }

```

> TSlint, ESlint, JSlint 등 다양하게 있는데 이 들은 작성되어지는 코드들이 표준을 잘 지키는지 등을 확인하는 정적 분석 도구이다. 아마도 위 tslint.json 설정파일은 이 정적 분석 도구의 어떠한 설정을 하는 파일 같다.

#### .babelrc

```json

{
  "presets": ["@babel/preset-env"]
}

```

> babel 관련 설정파일 이겠지..

### typescript + graphql 관련 소스 코드 생성

> 소스 코드를 담기위한 _'src'_ 폴더를 만들자. 현재 우리는 백엔드 환경을 구축하고 있는 것을 잊지 말자. 즉 backend 폴더 내부에 _'src'_ 폴더를 만들라는 의미다. 그리고 graphql 서버 실행을 위한 _'index.ts'_ 파일을 _'src'_ 폴더 안에 생성하자.

```

    workspace/backend> mkdir src
    workspace/backend/src> touch index.ts

```

#### index.ts

```ts

  import { GraphQLServer } from "graphql-yoga"
  // graphql-yoga 패키지를 GraphQLServer 라는 이름으로 가져온다.

  const typeDefs = `
    type Query {
      sayHello : String!
    }
  `
  // graphql server를 실행시키기 위해 필요한 파라미터 둘 중 하나 'typeDefs' 정의
  // 'typeDefs'는 인자값과 리턴되는 값의 타입을 지정한다. 
  // 추가적으로 'String!'에서 !는 null을 허용하지 않음을 의미한다. 

  const resolvers = {
    Query : {
      sayHello: () => "Hi there :0)"
    }
  }
  // graphql server를 실행시키기 위해 필요한 파라미터 둘 중 하나 'resolvers' 정의
  // 'resolvers'는 비지니스 로직이 실제로 들어가는 부분이다.

  const server = new GraphQLServer({ typeDefs, resolvers });
  // 'graphql-yoga'를 import한 GraphQLServer 객체와 위에 정의한 2개의 파라미터를 활용해 server 객체를 생성한다.
  // { } 이 표시는 왜 있을까? 한 객체로 파라미터를 전달한다는 의미일까?

  server.start(() => console.log('My first GraphQL Server is running on localhost:4000'))
  // 실제 서버를 실행시키는 코드이다.

```

### package.json script 수정하기

> node 기반 서비스들을 동작시키기 위해서 보통 npm, yarn 등의 패키지 관리자를 활용해 스크립트를 실행시킨다. 이 스크립트는 package.json 안에 script 속성을 활용해서 임의적으로 구현할 수 있으며 우리는 'index.ts' 에서 짠 graphql server가 잘 실행될 수 있도록 스크립트를 구성할것이다.

```json

  ...

  "scripts": {
      "dev": "cd src && nodemon --exec ts-node index.ts -e ts, graphql"
  }

  ...

```

> 기존에 존재하던 "test": "echo \"Error: no test specified\" && exit 1" 소스는 지우고 해당 부분에 위와 같이 "dev" 라는 이름을 가진 스크립트를 추가하자. 수정된 package.json 전문은 아래와 같다.

#### package.json

```json

{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "cd src && nodemon --exec ts-node index.ts -e ts, graphql"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-runtime": "^6.26.0",
    "graphql-to-typescript": "^0.1.2",
    "graphql-tools": "^4.0.6",
    "graphql-yoga": "^1.18.3",
    "nodemon": "^2.0.2",
    "ts-node": "^8.6.2",
    "tslint-config-prettier": "^1.18.0",
    "typescript": "^3.7.4"
  },
  "devDependencies": {
    "@types/node": "^13.1.7"
  }
}

```

<img src="/workspace/devlog/interpark/postgresql_typeorm_typescript_graphql/res/5.png">

### graphql server 실행하기.

> _'package.json'_ 안에 _'scripts'_ 속성 안에 "dev"에 해당하는 코드를 살펴 보면 src 폴더로 이동한 이후 _'index.ts'_ 파일을 ts-node를 활용해서 트랜스파일링 하고, 그 트랜스파일링된 js 파일을 nodemon으로 실행시키는 형태이다.

```
    1. src 폴더로 이동.
    
    2. ts-node를 이용해서 index.ts transpiling.

    3. nodemon으로 실행.
```

> 아래의 명령어를 통해 "dev" 스크립트를 실행시켜 보자.

```

  workspace/backend> npm dev run

```

<img src="/workspace/devlog/interpark/postgresql_typeorm_typescript_graphql/res/6.png">

> 혹시 위와 같은 오류가 전시되면서 실행이 안된다면 yarn 패키지 매니저를 설치하고 아래와 같이 명령어를 실행하자. / 위와 같은 에러가 나는 이유는 나도 잘 모르겠다.

```

  workspace/backend> yarn
  workspace/backend> yarn dev

```

> yarn 만 입력한 첫번째 명령어는 _'yarn'_ 패키지 매니저의 관련 기능들을 최신화 시켜주는 것이고 _'yarn dev'_ 명령어가 위의 _'npm dev run'_ 명령어와 동일하게 _'dev'_ 스크립트를 실행하는 역할을 한다.

<img src="/workspace/devlog/interpark/postgresql_typeorm_typescript_graphql/res/7.png">

> 위와 같은 로그가 보인다면 아래 링크를 클릭 혹은 'localhost:4000' 으로 접속해보자. 그러면 graphql-playground 패키지가 제공해주는 IDE를 확인할 수 있다.

[localhost:4000](http://localhost:4000/)

> 이 IDE는 postman의 역할과 유사하며, graphql 형식으로 REQ를 던지면 RES가 어떻게 나오는지를 확인해볼수 있다.


### graphql에서 query?

> query 타입과 mutation 타입은 graphql에서 일반적인 객체 타입과 동일하나 모든 graphql 타입 정의에서 첫부분에 사용된다는 점이 특별하다. 즉 이 타입들은 스키마에서 _'entry point'_ 즉 하나의 진입점으로 생각할 수 있다. query나 mutation 타입이 있다면 '아 이부분 부터 시작하는구나' 라고 인지시킬수 있다는 것이다. 그러나 아까 말했다시피 이들도 객체 타입임으로 object 타입과 동일하게 동작함을 기억하고 있는 것은 중요하다.

```

query {
  hero {
    name
  }
  droid(id: "2000") {
    name
  }
}

```

> 위와같은 쿼리를 본다면 _'query'_ 키워드를 통해 진입점을 찾고 그 안에 있는 _'hero'_, _'droid'_ 필드를 요청한다.


### postgresql + typeORM + typescript + graphql 환경을 위해 새로운 패키지 추가하자

> 지금까지 작업한 내용은 typescript + graphql 까지만을 활용한 환경 구축하는 방법이였다. 이제 여기에 postgresql 데이터베이스와 typeORM을 추가 연동하여 DB에 접근이 가능하도록 해보자. <br><br> 위에서 패키지들을 설치할 때 postgresql, typeORM와 관련된 패키지들은 설치하지 않았다. 이제 아래의 명령어를 활용해서 3개의 패키지를 더 추가해보자. 백엔드 폴더에서 설치해야함을 잊지말자.

```
  workspace/backend> npm install pg typeorm dotenv
```

> 설치가 잘 되었다면 아래처럼 _'dependecies'_ 항목에 추가되었을 것이다.

<img src="/workspace/devlog/interpark/postgresql_typeorm_typescript_graphql/res/8.png">

### 각 패키지에 대해 간략히 이해해보자.

#### pg

> postgresql 데이터베이스를 node에서 사용하기 위해서 추가로 설치해야 하는 패키지.

#### typeorm

> 말 그대로 typeORM을 사용하기 위한 패키지.

#### dotenv

> 데이터베이스의 환경설정 정보 같은 것을 다른 파일에 정의 해두고 사용하고 싶을 때 사용하는 패키지. 이렇게 되면 git 관리를 통해 보안성을 좀 더 향상 시킬 수 있다.

### typeORM을 위한 ormConfig.ts, .env 파일 생성

> typeORM을 활용해서 postgresql 데이터베이스를 함께 연동할 것이다. 연동할 때 필요한 설정들을 가지고 있는 파일 _'ormConfig.ts'_과 DB 정보를 가지고 있는 _'.env'_ 파일을 생성하자.

```
  workspace/backend/src> touch ormConfig.ts
  workspace/backend/src> touch .env
```

#### .env

```
DB_HOST = "localhost"
DB_USERNAME = "slack_clone"
DB_PASSWORD = "root"
```

#### ormConfig.ts

```typescript
import { ConnectionOptions, Connection, createConnection } from "typeorm";
// typeorm 패키지에서 위 3개의 객체들을 가져온다.
//  ConnectionOptions : typeORM에서 DB 환경 정보를 받기 위한 객체 타입.
//  Connection : typeORM에서 제공하는 연결 객체 타입 인듯.
//  createConnection : 연결을 만드는 함수

import dotenv from "dotenv";
dotenv.config();
// dotenv 패키지를 통해서 미리 만들어둔 DB 환경설정 정보를 가져온다. (계정, 패스워드 ...)

const connectionOptions:ConnectionOptions = {
    type : "postgres",              
    // typeORM 통해 사용할 DBMS
    database : "slack_clone",       
    // 데이터베이스 이름
    synchronize : true,             
    // DB관련 코드 수정 내용을 바로바로 적용할지에 대한 여부
    logging : true,                 
    // 서버가 시작될 때 DB 생성하는 쿼리 등의 로그를 보여줄지에 대한 여부
    entities : ["entities/**/*.*"],  
    // typeORM은 테이블의 생성을 도와주는데 그 테이블의 스키마 등을 명세하는 객체를 entity라고 함 그 파일들의 경로를 가리킴.
    host : process.env.DB_HOST,
    // 데이터베이스 접근할 때 
    port : 5432,
    // 데이터베이스 연결할 때 어떤 포트를 쓸건지에 대한 설정
    username : process.env.DB_USERNAME,
    // 데이터베이스 연결할 때 사용자 이름.
    password : process.env.DB_PASSWORD
    // 데이터베이스 연결할 때 사용자 비밀번호.
}

const connection:Promise<Connection> = createConnection(connectionOptions);
// 위에서 정의한 connectionOptions와 연결 객체를 만드는 createConnection() 함수를 활용해서 DB connection 객체를 만들고 이를 반환. 이 connection 타입은 Promise<Connection> 으로 Connection 객체인데 비동기로 받겠다는 의미.

export default connection;

```

### Promise 잠깐 알아보고 가자

> ES6로 넘어오기 전 JS의 문법에서는 Ajax와 같은 비동기 처리를 위해서 아래와 같은 형식의 콜백함수를 활용해야했다. 이러한 코드는 읽을 때 흐름이 계속 이리저리 바뀌게 되어 가독성에 좋지 않고 비동기 처리가 chaining될 경우 계속 중첩된 코드를 작성해야하는 이슈가 있다.

```js

function getData(callbackFunc) {
  $.get('url', function (response) {
    callbackFunc(response); 
  });
  }

getData(function (tableData) {
  console.log(tableData);
});

```

> Promise 객체를 사용하게되면 이러한 비동기 처리를 보다 가독성이 좋은 방법으로 구현할 수 있다. 

```js

function getData(callback) {
  return new Promise(function (resolve, reject) {
    $.get('url 주소/products/1', function (response) {
      resolve(response);
    });
  });
}

getData().then(function (tableData) {
  console.log(tableData);
});

```

> Promise 도입에 의해 정의하는 부분은 코드가 더 복잡하다고 생각할 수 있지만 실제 비동기 처리를 요구하는 실제로 getData() 함수를 사용하는 부분은 보다 더 간단해진다. 

### index.ts를 수정하고 postgresql + typeORM + typescript + graphql 환경 실행해보자.

> graphql 서버만 실행하는 기존코드에서 typeORM을 통해 postgresql DB를 먼저 연결 하고 그다음에 graphql 서버를 시작하는 코드로 수정하였다.

```ts

// (AS-IS)
server.start(() => 
  console.log('My first GraphQL Server is running on localhost:4000')
)

```

```ts

// (TO-BE)
connection.then(() =>
    server.start(() => 
        console.log('My first GraphQL Server is running on localhost:4000')
    )
);

```

> 아래는 _'index.ts'_ 의 수정된 전문이다. connection 개체는 방금 위에서 _'ormConfig.ts'_ 에서 생성한 녀석임으로 사용하기 위해서는 import 해야한다. 

```ts
import { GraphQLServer } from "graphql-yoga"
import connection from "./ormConfig"

  const typeDefs = `
    type Query {
      sayHello : String!
    }
  ` 

  const resolvers = {
    Query : {
      sayHello: () => "Hi there :0)"
    }
  }

  const server = new GraphQLServer({ typeDefs, resolvers });

connection.then(() =>
    server.start(() => 
        console.log('My first GraphQL Server is running on localhost:4000')
    )
);
```

```
  workspace/backend> yarn dev
```

<img src="/workspace/devlog/interpark/postgresql_typeorm_typescript_graphql/res/9.png">

> 위의 이미지 처럼 테이블들을 생성하는 로그가 나오고 서버가 실행되었다면 잘 구현한것이다.

[localhost:4000](http://localhost:4000/)

### entity를 활용하여 테이블을 구성해보자.

> typeORM을 활용하면 데이터베이스에 들어가서 직접 쿼리를 날려 테이블을 생성하지 않아도 된다. typeORM에서 제공하는 entity라는 것을 활용하면 보다 자유롭게 테이블을 생성할 수 있다. 이러한 방식의 이점은 테이블을 이루는 스키마가 변경해야할 경우 단순히 entity에 관련된 소스코드 수정만 하면 됨으로 직접 생성하는 방법보다 훨씬 간단하다. 그리고 typeORM에서 다양한 데이터베이스를 지원하고 있기에 어떤 시스템의 데이터베이스가 다른 종류로 변경될 경우(예를 들어 mariaDB -> oracle) 큰 리스크 없이 변경이 가능하다.

> entity를 관리하는 폴더 _'entities'_ 를 만들고 그 안에 _'Message.ts'_, _'Channel.ts'_ 두 개의 파일을 만들자.

```
  workspace/backend/src> mkdir entities
  workspace/backend/src/entities> touch Message.ts
  workspace/backend/src/entities> touch Channel.ts
```

> _'Message.ts'_, _'Channel.ts'_ 두 파일은 각각 Message 테이블, Channel 테이블을 생성할 때 필요한 스키마 정보들을 가지고 있다.

#### Message.ts

```ts

import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import Channel from './Channel'
// 로컬에 만든 파일을 가져올 때는 확장자 생략이 가능하다.

@Entity()
// @Entity() : typeORM의 entity임을 선언
class Message extends BaseEntity {
    // @PrimaryGeneratedColumn() : mariaDB의 auto_increment와 유사한 역할, Primary Key로 사용할 목적
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({type: "text", nullable: false}) : 컬럼임을 가리키며 해당 컬럼의 스키마 타입과 null값 허용 여부 명시
    @Column({type: "text", nullable: false})
    nickname: string;

    @Column({type: "text", nullable: false})
    contenta: string;

    // 본인과 대상의 관계까 N : 1 임을 표현할 때 사용하는 어노테이션. Message : Channel = N : 1
    // type에는 대상이 되는 클래스 명을 적고 서로 관계되어있는 컬럼으로 연결지음.
    @ManyToOne(type => Channel, channel => channel.messages)
    innerChannel: Channel;

    @Column({type: "text", nullable: false})
    innerChannelId: number;

    // 테이블이 생성되는 시점을 저장하는 필드로 typeORM에서 제공하는 @CreateDateColumn()을 활용해서 바로 구현 가능
    @CreateDateColumn()
    createdAt: string;

    // 테이블이 생성되는 시점을 저장하는 필드로 typeORM에서 제공하는 @UpdateDateColumn()을 활용해서 바로 구현 가능
    @UpdateDateColumn()
    updatedAt: string;
}

export default Message

```

> 

#### Channel.ts

```ts

import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import Message from "./Message";

@Entity()
class Channel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text", nullable: false})
    channelName: string;

    // 본인과 대상의 관계가 1: N 관계를 표현하기 위한 어노테이션. 대상의 관계가 N임으로 이를 표현하기 위해 배열을 사용하고 있음을 볼 수 있다.
    @OneToMany(type => Message, message => message.innerChannel)
    messages: Message[]

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

}

export default Channel

```

일대다&다대일
부모와 자식의 관계에서 자식이 그 부모에 고유성을 가지는 것이면 일대다&다대일 관계를 사용.
그러나 고유성이 없다면 다대다 관계를 사용.

> 오직 N:M 관계를 사용하는 방법과 1:N, M:1 두가지를 관계를 사용하는 방법의 차이에 대해서 의아할 수도 있다. 이는 자식의 고유성을 고려했을 때 존재한다면 1:N, M:1으로 표현하고 그렇지 않다면 N:M 관계로 생각하자. 추가적으로 N:M 관계는 사실상 물리적으로 구현이 불가능하고 성능 상의 문제가 있어 사실상 N:1, 1:M으로 표현되어야 한다. 결론적으로 자식의 고유성에 따라 DB 모델링 할때 고려되어지는 방안은 아래와 같다.

```
  if(자식의 고유성 유)
    then 1:N, M:1
  
  else if(자식의 고유성 무)
    then N:1, 1:M
```

> 프로젝트를 실행한 후 postgresql에 두 테이블이 생성되었는지 확인해보자.

```
  workspace/backend> yarn dev
```

<img src="/workspace/devlog/interpark/postgresql_typeorm_typescript_graphql/res/10.png">

<img src="/workspace/devlog/interpark/postgresql_typeorm_typescript_graphql/res/11.png">

<img src="/workspace/devlog/interpark/postgresql_typeorm_typescript_graphql/res/12.png">

### graphql 구조 개선을 위해 새로운 _'merge-graphql-schemas'_ 패키지 설치

> _'index.ts'_ 파일을 보자. graphql 서버를 실행시키기 위해서는 _'typeDefs'_, _'resolvers'_ 이 두가지 파라미터가 필요하다.
이러한 정보들을 graphql의 스키마라고 부르는데 지금까지의 스키마 정보는 단순히 graphql을 실행시키기 위해서 임의의 샘플 정보를 넣어둔 것이였다. 이번에는 실제로 slack을 구현할 수 있도록 이 스키마 정보를 수정해보자. 또 스키마 관리의 효율성을 증대시키기 위해서 이 스키마 데이터들을 별도의 파일로 관리하는 방법을 알아보자. <br><br> graphql의 schema, resolver 들을 별도의 폴더로 관리할 수 있게 해주는 패키지 이다.npm 혹은 yarn을 활용해서 위의 패키지를 설치하자.

```
  workspace/backend> npm install merge-graphql-schemas
```

### Graphql을 위해 _'Type'_ 들을 정의해보자

> 이 환경에 가장 아쉬운 부분이라고 생각되는 것은 typeORM을 이용하기 위한 VO와 graphql을 이용하기 위한 모델이 별도로 관리되어야 하는 점이다. 이는 아직 graphql의 버전이 낮아서 개선이 안된 부분이라고 함. 위에서 typeORM을 활용할 때에는 _'Message'_, _'Channel'_ 테이블을 구성하기 위해서 이들을 위한 _'Message.ts'_, _'Channel.ts'_ 파일을 만들었다. 이번에는 graphql를 활용해 Client, Server의 api 통신하기 위한 모델을 작성할 것이다. 이 모델들은 graphql 서버를 실행할 때 반드시 필요한 _'type'_, _'resolver'_ 정보를 필히 규명해야 한다. _'index.ts'_ 에서 sample 사용되었던 _'type'_, _'resolver'_ 를 대신하기 위해 별도의 폴더, 파일로 관리되는 구조를 만들자.

```

  workspace/backend/src> mkdir api

  workspace/backend/src/api> mkdir Channel
  workspace/backend/src/api> mkdir Message

  workspace/backend/src/api/Channel> mkdir Shared
  workspace/backend/src/api/Channel/Shared> touch Channel.graphql

  workspace/backend/src/api/Message> mkdir Shared
  workspace/backend/src/api/Message/Shared> touch Message.graphql

```

#### Channel.graphql

```ts

type Channel {
    id: Int!
    channelName: String!
    messages: [Message]
    createAt: String!
    updatedAt: String
}

```

#### Message.graphql

```ts

type Message {
  id: Int!
  nickname: String!
  contents: String!
  innerChannel: Channel!
  innerChannelId: Int!
  createdAt: String!
  updatedAt: String
}

```

> 이 graphql을 위한 모델은 typeORM을 위한 모델과 동일한 필드, 타입을 가지고 있다. 만약 여러가지 상황에 의해 서로 상이해야할 경우가 생긴다면. 커스터마이징된 type을 새로 생성하거나 resolver에서 필요하지않은 필드의 값을 null로 주고 api 통신을 진행할 수도 있다. 지금까지 만든 스키마 파일들을 GraphQLServer 객체로 전달하기에 적절한 형태로 융합하고 정제하는 _'schema.ts'_ 를 만들자.

```
  workspace/backend/src> touch schema.ts
```

#### schema.ts

```ts

import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas"
import { makeExecutableSchema } from "graphql-tools"
import path from "path"

const allTypes: any = fileLoader(path.join(__dirname, "./api/**/*.graphql"));
// type 관련 파일들을 가져옴.

const allResolvers: any = fileLoader(path.join(__dirname, "./api/**/*.resolvers.*"));
// resolver 관련 파일들을 가져옴.

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers: any = mergeResolvers(allResolvers);
// 가져온 type, resolver 들을 가지고 무언가 작업을 해주는 것 같은데 잘 모르겠다.

const schema = makeExecutableSchema({
    typeDefs: mergedTypes,
    resolvers: mergedResolvers
});
// type, resolver를 가지고 schema를 구성한다.

export default schema;

```

> _'index.ts'_ 파일에서 기존에 작업해두었던 샘플 type, resolver는 지우고 위 schema.ts에서 만들어진 schema 정보를 사용할 수 있도록 구성해보자.

#### index.ts

```ts

import { GraphQLServer } from "graphql-yoga"
import connection from "./ormConfig"
import schema from "./schema"

const server = new GraphQLServer({ schema });
// schema.ts 에서 생성해서 export한 객체를 typeDefs, resolvers를 대신해서 파라미터로 넘겨주고 있다.

connection.then(() =>
    server.start(() => 
        console.log('My first GraphQL Server is running on localhost:4000')
    )
);

```

> 나의 경우 schema 파라미터를 넘겨주었는데 타입이 안맞다는 문구와 함께 계속 에러메시지가 표출되었었는데 이러한 경우 _'yarn'_ 명령어를 통해 패키지를 업데이트 및 재설치를 진행해주면 개선된다

```
  workspace/backend> yarn
```

> 지금까지 작업을 정리해보면 우리는 graphql를 위한 _'type'_ 즉 모델을 정의하고 이 모델들을 효율적으로 관리하기 위해 별도의 폴더로 분리. 그리고 마지막으로 그 분리된 graphql type 파일들을 _'schema.ts'_ 하나로 합쳐 _'index.ts'_ 파일에서 graphql 서버에 임시로 만들었던 typeDefs, resolver를 대신해서 넘겨주었다. 하나 명확히 이해해야하는 것은 위에에서도 언급했지만 _'Channel'_, _'Message'_ 라는 두 모델이 현재 두 곳에서 관리되어 진다는 점이다.

```
                    Graphql                 Typescript

Channel             Channel.graphql         Channel.ts

Message             Message.graphql         Message.ts

```

> 이 두 형태의 모델들은 각각 다른 역할을 가지고 있다. graphql의 확장자를 가지고 있는 _'Channel.graphql'_, _'Message.graphql'_ 들은 graphql api를 만들기위해 사용되어졌고 ts 확장자를 가지고 있는 _'Channel.ts'_, _'Message.ts'_ 들은 typescript가 이해할 수 있는 형태로 여기서는 typeORM이 엔티티를 생성할때 그 엔티티 정보를 주기 위해서 사용되어지고 있다.

### 함수(동작)에 대한 타입 정의를 해보자.

> 우리는 이전까지 만들었던 _'Channel.ts'_, _'Message.ts'_, _'Channel.graphql'_, _'Message.graphql'_ 들은 모두 모델에 대한 정의 즉 데이터의 형태에 대한 정의이다. 이제는 실제 api라고 불릴만한 함수에 관한 타입들을 만들어보자. 위에서 모델을 위한 타입들이 _'graphql'_ 을 위한 것, _'typescript'_ 두 종류로 나뉘어졌던것 처럼 함수에 대한 타입들도 _'graphql'_ 을 위한 것, _'typescript'_ 를 위한 것으로 나누어야한다. 그러나 분명하게 다른 점은 모델은 이 두가지를 위해 코드를 작성해야 했지만 함수를 위한 타입들은 _'graphql'_ 과 관련된 코드만 만들어내고 _'graphql-to-typescript'_ 패키지를 통해서 _'typescript'_ 관련된 코드들을 자동으로 생성시킬 것이다. 그렇다면 이 변환된 ts 파일을 가지고 resolvers.ts 파일에서 비지니스 로직을 구성할 수 있다.

#### 함수(동작) 타입을 구현하기 위한 순서

```

  1. resolvers 공통 인터페이스 'Resolver' 생성

  2. 필요한 폴더 및 파일 생성

  3. 함수 타입 변환을 위해 'gql-merge', 'graphql-to-typescript' 패키지 설치 

  4. 함수 타입 변환을 위한 'package.json'의 'script' 부분 수정

  5. 함수 타입 정의

  6. 'gql-merge', 'graphql-to-typescript' 를 활용하여 typescript 함수 타입 생성

  7. 변환된 typescript 함수 타입을 활용하여 resolvers 영역에 비지니스 코드 생성.

  8. graphql 실행 및 api 테스트

```

### 1. resolvers 공통 인터페이스 'Resolver' 생성

```

  workspace/src> mkdir types

  workspace/src/types> touch resolvers.d.ts

```

> resolvers를 정의할 때 필요한 무언가라고 했었는데 명확히 이해하지는 못했다 다시 물어봐야할듯.

#### resolvers.d.ts

```ts

export type Resolver = (parent: any, args: any, context: any, info: any) => any;

export interface Resolvers {
  [key: string]: {
    [key: string]: Resolver;
  };
}

```

### 2. 필요한 폴더 및 파일 생성

> 아래의 폴더와 파일들을 만들어보자. _'schema.graphql'_ 파일은 우리가 손수 정의한 함수 타입들을 총괄하여 저장하는 파일이며 _'graphql.d.ts'_ 파일은 이 _'schema.graphql'_ 파일을 입력으로하여 typescript를 위해 변환된 함수 타입을 저장하는 파일이다.

```

  workspace/backend> touch schema.graphql

  workspace/backend/types> touch graphql.d.ts

```

### 3. 함수 타입 변환을 위해 'gql-merge', 'graphql-to-typescript' 패키지 설치 

> typescript를 위한 각 함수 타입들을 자동 생성 및 변환하기 위해서 아래의 패키지를 설치한다. _'graphql-to-typescript'_ 패키지는 이미 설치되어있을수도 있다. 정확히는 _'gql-merge'_ 를 통해 분산되어있던 함수타입 파일들을 하나의 파일(_'schema.graphql'_)에 통합시킬 수 있으며 _'graphql-to-typescript'_를 통해 _'.graphql'_ 로 정의되어있던 함수타입을 _'.ts'_ 으로 변환하여 _'graphql.d.ts'_ 파일에 저장한다.


```
  workspace/backend> npm install gql-merge graphql-to-typescript
```

### 4. 함수 타입 변환을 위한 'package.json'의 'script' 부분 수정

> _'gql-merge'_ 패키지외 _'graphql-to-typescript'_ 패키지는 node script 기능을 활용하여 실행할 수 있다. _'package.json'_ scripts 부분을 아래와 같이 변경하자.

#### package.json

```
  ...

  "scripts": {
    "dev": "cd src && nodemon --exec ts-node index.ts -e ts,graphql",
    "predev": "yarn run types",
    "types": "graphql-to-typescript ./src/schema.graphql ./src/types/graphql.d.ts",
    "pretypes": "gql-merge --out-file ./src/schema.graphql ./src/api/**/*.graphql"
  }

  ...

```

> node script의 특성 중에 하나는 앞이 _'pre-'_ 가 붙은 스크립트들은 같은 이름을 가진 스크립트 보다 먼저 실행시킬 수 있다. 위 스크립트를 해석해보면  _'dev'_ 스크립트를 실행하기 이전에 _'predev'_가 실행되고 이 스크립트에 따라서 _'types'_ 스크립트가 실행된다. _'types'_ 스크립트도 같은 원리에 따라 _'pretypes'_ 가 먼저 실행되어 우리가 만들었던 _'graphql'_를 위한 타입들이 _'schema.graphql'_ 파일에 합쳐지고 정리된다. 그리고 _'types'_ 에서 _'schema.graphql'_ 에 정의되어진 타입들을 _'typescript'_ 를 위한 타입들로 변환한다. 이 변환된 타입들은 _'./src/types/graphql.d.ts'_ 파일 안에 저장된다.

```
  scripts 실행 순서

  1. "predev" : "types" 스크립트를 실행한다.

  2. "pretypes" : '.graphql' 형태의 타입들을 'schema.graphql'파일에 통합 저장한다.

  3. "types" : 타입들이 통합 저장되어진 'schema.graphql'파일을 활용해 함수 타입들을 typescript 형태로 변환하고 이들을 'graphql.d.ts'에 저장한다.

  4. "dev" : 서버가 실행된다.

```

### 5. 함수 타입 정의

> 함수 타입을 생성할 준비가 되었다 이번에는 메시지를 가져오는 동작을 하는 _'GetMessages'_  api 함수를 만들어보자. 우선 이를 위한 폴더 및 파일를 만든다.

#### GetMessages.

```

  workspace/backend/src/api/Message> mkdir GetMessages

  workspace/backend/src/api/Message/GetMessages> touch GetMessages.graphql

  workspace/backend/src/api/Message/GetMessages> touch GetMessages.resolvers.ts

```

> _'.graphql'_ 형태의 _'GetMessages'_ 동작의 타입을 지정하자. 

#### GetMessages.graphql

```ts

type GetMessagesResponse {
    ok : Boolean!
    error : String
    messages : [Message]
}

type Query {
    GetMessages(innerChannelId: Int!) : GetMessagesResponse!
}

```

> _'GetMessages'_ 함수 타입의 비지니스 로직은 _'GetMessages.resolvers.ts'_ 에서 구성한다. 

### 6. _'gql-merge'_, _'graphql-to-typescript'_ 를 활용하여 typescript 함수 타입 생성

> 위에서 정의한 스크립트를 활용하여 _'schema.graphql'_ 파일에 각 타입들을 통합시키고 _'graphql.d.ts'_ 파일에 typescript를 위한 함수 타입을 만들어내자.

```
  workspace/backend> yarn types
```

### 7. 변환된 typescript 함수 타입을 활용하여 _'GetMessages.resolvers.ts'_ 영역에 비지니스 코드 생성.

> 변환된 함수 타입을 활용하여_'GetMessages.resolvers.ts'_ 안에 비즈니스 코드를 작성한다. 해당 형태는 거의 유사하며 눈에 익혀두거나 코드를 복사해두어 다른 함수 타입들을 생성할 때에도 활용하자.

#### GetMessages.reseolvers.ts

```ts

import { Resolvers } from "src/types/resolvers";

// 상대경로로 사용해야함 (절대경로로는 파일을 못찾음)
import Message from "../../../../src/entities/Message";

// 아래 쿼리 구조는 graphQL에서 정해놓은 규격
const resolvers: Resolvers = {
    Query: {
        GetMessages: async(_, args) => {
            // GetMessages 라는 동작에 대한 비즈니스 로직 (Spring의 Controller와 유사)
            // 사용자가 API를 호출했을때 인자값이 args 안으로 들어온다.

            try {
                const {innerChannelId} = args; 
                // = const innerChannelId = args.innerChannerId;
                // Message (typeORM) 을 사용하여 쿼리 메소드를 실행할 수 있음
                // innerChannelId와 일치하는 데이터를 조회해달라는 의미

                const messages = await Message.find({innerChannelId});
                // await : 동기적으로 실행되고있으므로 데이터를 가져올때까지 기다려줘야해서 await 선언
                // {innerChannelId} =>(동일) innerChannelId = innerChannelId
                // 리스트 조회 =select * from Message where innerChannelId = 0
                
                return {
                    ok: true, // 성공
                    error: null, // 성공했으므로 error는 null
                    messages: messages // 위 쿼리메소드를 통해 조회해온 데이터를 담음
                }
            } catch(error) {
                return {
                    ok: false, // 에러 발생
                    error: error.message, // js에서 지원해줌
                    messages: null // 에러가 발생하였으므로 messages는 비어있다
                }
            }
        }
    }
}

export default resolvers;

```

### 8. graphql 실행 및 api 테스트

> 아래 명령어를 입력하고 위에서 만든 _'GetMessages'_ api가 정상적으로 작동하는지를 확인하자. 여기서 한가지 중요한 점은 이 api는 CRUD에 R의 기능을 함으로 Channel 테이블과 Message 테이블이 각각 튜플을 직접 생성을 해야 테스트가 정상작동한다.

```
  workspace/backend> yarn dev
```

```

#### GetMessages() API

query {
  GetMessages(innerChannelId: 1) {
    ok
    error
    messages
  }
}

```

### _'CreateChannel'_ 함수 타입을 만들어보자.

> 함수타입을 만들고 이를 api화 하는 과정은 _'GetMessages'_ 와 유사함으로 상세한 설명은 생략하겠다. <br><br> _'CreateChannel'_()는 새로운 채널을 만드는 api이다 _'CreateChannel'_ 에 필요한 폴더 및 파일들을 만든다.

```

  workspace/backend/src/api/Channel> mkdir CreateChannel

  workspace/backend/src/api/Channel> touch CreateChannel.graphql

  workspace/backend/src/api/Channel> touch CreateChannel.resolvers.ts

```

> _'CreateChannel'_ 함수 타입을 정의한다.

#### CreateChannel.graphql

```ts

type CreateChannelResponse {
    ok: Boolean!
    error: String
}

type Mutation {
    CreateChannel(channelName: String!):CreateChannelResponse!
}

```

> _'gql-merge'_, _'graphql-to-typescript'_ 를 활용하여 typescript 함수 타입 생성한다.

```
  workspace/backend> yarn types
```

> 변환된 typescript 함수 타입을 활용하여 _'CreateChannel.resolvers.ts'_ 영역에 비지니스 코드 생성한다.

####  CreateChannel.resolvers.ts

```ts

import { Resolvers } from "src/types/resolvers";
import { CreateChannelMutationArgs, CreateChannelResponse } from "../../../../src/types/graphql"
import Channel from "../../../../src/entities/Channel";
// 상대경로로 사용해야함 (절대경로로는 파일을 못찾음)


const resolvers:Resolvers = {
    Mutation: {
        // args는 channel name.
        CreateChannel: async(_, args: CreateChannelMutationArgs):Promise<CreateChannelResponse> => {
            // GetMessages 라는 동작에 대한 비즈니스 로직 (Spring의 Controller와 유사)
            // 사용자가 API를 호출했을때 인자값이 args 안으로 들어온다.

            try {
                const { channelName } = args;
                // const { channelName } = args.channelName;

                const existChannel = await Channel.findOne({ channelName });
                // Message (typeORM) 을 사용하여 쿼리 메소드를 실행할 수 있음
                // await : 동기적으로 실행되고있으므로 데이터를 가져올때까지 기다리기 위함.
                // 'channelName' 일치하는 데이터를 조회해달라는 의미
                // findOne()은 SELECT Query와 유사하며 한가지의 튜플만 가져온다.

                if(existChannel) {
                    return {
                        ok: false,
                        error: "이미 존재하는 채널입니다."
                    }
                }
                // 채널이름이 중복될 경우 채널을 새로이 만들지 않기위함

                await Channel.create({channelName}).save();
                // 채널은 새롭게 만드는 부분.
                // Create()는 INSERT Query와 유사하며 새로운 튜플을 생성할 수 있다.
                // 뒤의 save() 함수를 호출하여야 실제 데이터베이스에 생겨남 COMMIT 개념같음.

                return {
                    ok: true,
                    error: null
                }
                // 성공했을 때의 응답 / 'CreateChannelResponse'를 'gql-merge'를 활용해서 변환하여 얻어낸 타입.
            
            } catch(error) {
                return {
                    ok: false,
                    error: error.message
                }
                // 실패했을 때의 응답 / 'CreateChannelResponse'를 'gql-merge'를 활용해서 변환하여 얻어낸 타입.
            } 
        }
    }
}

export default resolvers;

```

> 아래 명령어를 통해 graphql 서버를 실행하고 및 api를 테스트해보자.

#### 서버 실행

```
  workspace/backend> yarn devl
```

#### CreateChannel() API
```
mutation {
  CreateChannel(channelName: "마블리게시판") {
    ok
    error
  }
}
```