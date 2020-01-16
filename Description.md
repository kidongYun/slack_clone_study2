# typescript는 script language 인가?

> typescript는 스크립트 언어 즉 인터프리터를 사용하는 방식의 언어일까? 처음보는 아래와 같은 기술들을 찾아보면서 낯설게 들은 단어는 트랜스파일링이다. typescript는 결과적으로 봤을 때는 자바스크립트와 같은 인터프리터 방식의 언어가 아니며 오히려 자바와 같은 컴파일링 기반을 가진 언어라고 보는게 더 맞는 것 같다. 대부분이 아는 특징인 정적 타입 지정을 할수 있고 또 상속, 인터페이스 등의 구현이 가능하다.
그렇다고 해서 온전한 컴파일을 하는 것은 아니여서 많은 개발자들이 이러한 언어들을 트랜스파일링 언어라고 부르는 것 같다. 트랜스파일 작업은 미리 구현되어져 있는 helper 함수를 활용해서 타입스크립트로 구현한 파일들을 트랜스파일링하게되면 자바스크립트로 변환되어진다.


# 1. Backend

## The setting about postgresql + typeORM + typescript + graphql.

### package install

> 백엔드 서비스를 위한 루트 디렉토리를 만들자. 이름은 _'backend'_ 이다.

```
    workspace> mkdir backend
```

> 백엔드 디렉토리 안에서 _npm init_ 명령을 사용해 node 기반 서비스를 구성하기 시작함을 알리자.

```
    workspace/backend> npm init
```

<img src="./res/1.png" style="width:50%;"/>

> 그렇다면 위의 이미지와 같이 node 서비스에서 기본적으로 필요한 package.json 파일을 생성하기 위해서 많은 것들을 물어본다. 모두 Enter를 눌러서 무시해주자. <br><br> 이제 postgresql + typeORM + typescript + graphql 기술들을 사용하기 위해서 필요한 라이브러리, 모듈, 패키지들을 npm을 활용해 설치할 것이다. backend 폴더로 이동한 이후 아래의 명령어를 입력하자.

```
    workspace/backend> npm install graphql-to-typescript graphql-tools graphql-yoga nodemon ts-node tslint-config-prettier babel-runtime typescript
```

> 만약 설치가 잘 완료되었다면 _'package.json'_ 파일 안에 _'dependencies'_ 항목이 생기는데 그 항목 안에는 우리가 설치한 패키지들을 확인할 수 있다.

<img src="./res/2.png" style="width:50%;"/>

> 각 패키지들의 역할을 간략하게나마 소개하자면 아래와 같다.

#### graphql-to-typescript

> type, resolver와 같은 graphql 관련 설정들을 typescript 문법을 활용해서 작성할 수 있게 도와주는 패키지 인것 같다.

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

#### create .gitignore

> git commit/push 전에 node_modules 폴더 내부를 보자. 우리가 설치한 패키지들 고작 몇개인데 그것들로 인해 node_modules 폴더는 수많은 파일들로 가득 차있다. 이 파일들도 git에 올리게 되면 참 고생길이 훤할 것이다. 또 정작 실제 소스들도 아님으로 그렇게 중요한 파일들은 아니다. git 업로드 내용에 제거하기 위해서 _'backend'_ 폴더 내부에 _'.gitignore'_ 파일을 생성하자. 그리고 그 안에 node_modules 라고 적자.

```
    workspace/backend> touch .gitignore
```

#### .gitignore
```
    node_modules
```

### 각 설정파일들 내용 입력하기

설정이 필요한 파일들을 만들자.

```

    workspace/backend> touch nodemon.json
    workspace/backend> touch tsconfig.json
    workspace/backend> touch tslint.json
    workspace/backend> touch .babelrc

```

#### nodemon.json

```json

    {
    "ext": "js graphql"
    } 

```

> 위 파일에서 _"ext"_ 속성은 확장자를 의미하는데 해당 확장자의 코드가 수정될 경우 프로젝트는 새로고침된다.

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
      "experimentalDecorators": true
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

> typescript의 설정파일로 트랜스파일링할때의 설정정보를 넣은 것 같음 자세히는 모름. 니가 알아봐

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

> 자세히는 모르겠고 코드 표준을 잘 지키는지 등에 대한 설정.

#### .babelrc

```json

{
  "presets": ["@babel/preset-env"]
}

```

### 소스 폴더 구성

> 소스 폴더 및 index.ts 파일을 만들자. 구조는 아래와 같다.

```

    workspace/backend> mkdir src
    workspace/backend/src> touch index.ts

```

### 2020.01.16

GraphQL Schema 정보를 다른 폴더 구조로 뺴고 이들을 만든다음에 생성.

@ManyToOne 어노테이션 안에 값들이 대소문자가 구분되는데

=
setRelation(innderChannel, channel.messages)
-> 다 대 1이라는 관계를 설정한 것.


그거는 닉네임을 설정한거라고 생각하면 됨.

Channel as channel

다대다에대한 생각.

다대다 방식을 그대로 사용하여 모델링하는가.
혹은 중간에 한개의 테이블을 더 만들어서 구현하는가 의 개념.

일대다&다대일
부모와 자식의 관계에서 자식이 그 부모에 고유성을 가지는 것이면 일대다&다대일 관계를 사용.
그러나 고유성이 없다면 다대다 관계를 사용.

긍데 원래 디비 설계할 때 다대다도 다대일&일대다로 만들어야 되는뎅. -> 성능문제

schema.ts 파일이 이제 그래프큐엘 설정에 필요한 정보들 타입, 리졸버에대한 정의를 진행하는 파일.
사실 하나의 typeDef 안에 모든걸 정의할 수 잇다면, 리졸버도 그렇다면 이렇게 구분할 필요가 없지만.

만약 이것들을 정리를 하고 싶다면 다른 디렉토리, 파일들을 구현해 별도고 관리하고. 이것들이 schema.ts 로 임포트되고
마지막으로 이파일이 스키마를 정리해서 graphQLServer에 전달한다. 이 정보를 가지고 그래프큐엘 서버를 생성한다.

Message.graphql 과 Message.ts 의 차이는 타입도 다르고 뭐 다다름.
전자는 그래프큐엘 관점에서의 정의를 사용한거고.
후자는 엔티티 생성시 필요한 파일.

타입스크립트와 그래프큐엘을 같이사용하기 위해서는 일단 자료형 관리가 그래프큐엘을 위한것, 타입스크립트를 위한것
이렇게 두가지로 관리를 해야함 -> 이거는 아직 버전이 낮아서 개선이 안된 부분이라고 생각.

src/entities/Channel.ts -> 엔티티 즉 postgres를 위한 자료형,. 아니다 typeORM이라고 생각해야겠다.
Channel.graphql -> 그래프큐엘를 위한 자료형.

이 둘의 파일은 항상 싱크가 맞아야함 -> 둘의 구조가 동일해야함.
이건 사실 좀 안좋은 것 같은데.

GetMessages -> 이건 그래프큐엘에서 사용하는 api임. 리턴값과 파라미터들을 정의함.
GetMessages.graphql 이 파일은 그래프큐엘을 위한 타입. 확장자만 봐도 알 수 있다.

message

오늘 가장 큰 논점 주제는 graphql과 typeORM의 VO가 서로 상이해도 연결이 되는가 .

완전히 맞아야하는가. 아니면 약한 결합성을 가져서 완전히 맞지는 않아도 연결이 되는가.
이건 테스트 해보면 될것 같은데.


graphql
typedefs (파라미터)
->

->

->
graphql
return

typeORM에게 파라미터를 가공하기 위해서 typedef를 사용.

graphql typedef != ts typedef

typesrcipt에는 any타입이 없다.

d.ts -> 커스텀 타입 디피니션 파일

리졸버를 만들때마다 정의를 해야함.

Resolvers 는 지원해주지 않으니 우리가 만듬.

schema.ts 에서 각 파일들을 융합해서 관리하기 때문에 이 파일들끼리는 굳이 import해주지 않아도 된다

typeORM에서 주는 데이터를 그래프QL데서 받을 때 커스텀하게(뭘 빼고 받는다거나) 하려면 새로운 커스텀 타입을 정의해서 가져와야함.
혹은 리졸버 내부에서 새롭게 가공하거나.
