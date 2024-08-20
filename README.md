# 7월09일(화) 
1. 오리엔테이션
  - 세상 돌아가는 IT 얘기
  - 수업을 "인공지능 플랫폼 기능 구현"
    - 파이썬
  - 진학과 사회로 진출 기로
    - 회사에서 필요한 기술이 뭐가 있는지?
    - 서버 Side에서 필요한 기술
      - 유닉스 환경, 리눅스 환경, Windows NT -> 2019
      - 리눅스를 적극 추천
    - 클라이언트 Side에서 필요한 기술
      - 3대 MVC, MVVR 개발패턴
      - 리액트(70%), 뷰, 앵귤라
  - 질문 및 답변

# 7월16일(화) 과제
1. 환경설정
  - visual studio 설정
    - 마크다운 사용법 (스스로)
    - drawio 확장자로 설계문서(흐름도)
  - git 설정
    - windows에 깃 설치
    - clone, stage, commit, push, origin, branch 
  - 리눅스서버를 만들자.
    - 방법1. 클라우드(cloud)에 만들기
    - 방법2. 내 학교 컴퓨터에 windows에 만들기
    - 방법3. 추천) 내 노트북바꾸기

# 7월23일(화) 과제
1. ???

# 7월24일(수) 과제
1. vi 에디터를 사용할 줄 알아야 한다. (IDC같은 서버실에서 모니터 물려 작업할때)
2. NodeJS, express, dotenv, mongoose, ejs
3. Mongodb Atlas 회원가입, db생성하고, 클라이언트연결
4. Server단 구성 + 회원가입 중간까지 진행

# 7월25일(목) 과제
1. Server단 끝냈음.
  - 핵심알고리즘만 추출
  - 데이타를 입력하는 화면 제작
  - 사용자 입력데이타를 서버에서 수신모듈 제작
  - 몽고DB Atlas 클라우드로 전송
  - 전송결과를 클라우드에서 확인함 (1인 3명씩 회원가입)
  - 처리결과를 클라이어트 화면에서 표시함 (성공메시지 표시)
  - 신규회원과, 중복여부를 체크까지 성공함 (이미 있는 회원입니다. 메시지 표시)

# 7월26일(금) 과제
1. 어제 참석못한 친구 Fork
  https://github.com/bundang-highschool/lecture_20240726.git
1. 카카오톡 클라이언트 진행
  - NPX(Node Package eXecute) : 설치 + 실행개념
  - 리액트 설치
    - npx create-react-app client
    - cd client / npm start
  - tailwindcss 설치 (https://tailwindcss.com/docs/installation 매뉴얼 참조)
    - npm install -D tailwindcss
    - npx tailwindcss init
    - tailwind.config.js 파일안에 "./src/**/*.{html,js}" 넣기
    - src/input.css 맨위에 코드 삽입
  - React Router 설치
    - npm install react-router-dom
  - vscode 확장팩 설치
    - Tailwind CSS IntelliSense
    - ES7 React/Redux/React-Native snippets
      - rafce 자동완성
1. async / await 약간의 실습(20분정도)

# 8월5일(월) 과제
1. github codespace에서 postman 실행할 때
  - Header에 X-Github-Token값을 전달해야함 (echo $GITHUB_TOKEN으로 알아낸다.)
1. 카카오클라이언트 프로그램 만들기
  - 회원가입 서버 api 호출
  - 추가설치
    - npm install axios : Promise기반 http클라이언트 라이브러리
    - npm install react-host-toast : 토스트메시지
    - npm install react-icons : 리렉트 기본제공 아이콘
  - 아이디(계정) 로그인 -> 비밀번호 로그인
  - 개인사진 프로필 등록
1. 채팅화면 하드코딩으로 그리기
  - Sidebar.js, MessagePage.js

# 8월6일(화) 과제
1. 카카오클라이언트 프로그램 만들기
  - chat sample 가볍게 예제 만들기
  - Chat 대화기능

# 2막 수업
# 8월7일(수) 과제
1. LLM - ChatGPT ~

# 8월9일 수업내용
1. (완료)로그인 성공후, 토큰발행하고 쿠키굽기
1. 쿠키를 읽어 사용자정보 조회하기
1. 위에서 읽은 정보 리덕스 넣기
1. 로그아웃
1. 홈에서 로그인 안되어 있으면, 로그인페이지로 이동
------------------------------------------------
1. A.I 랭체인

# 8월12일(월) 수업내용
1. 사용자정보 수정
1. 친구목록 보여주고
1. 채팅창 Header 만들고
------------------------------------------------
1. A.I 랭체인(계속)

# 8월13일(화) 수업내용
1. 소켓통신 시작(환경구성)
1. /server (소켓서버만들기)
  npm install socket.io
  /socket/index.js
1. /client (소켓클라이언트)
  npm install socket.io-client
  /src/pages/Home.js
1. 코드에 영향주기
  - Avata에 접속여부 표시
  - 대화방 상단에 상대방 노출

# 8월20일(화) 
1. 실제 대화하기



