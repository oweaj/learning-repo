#### 설명

과제 테스트를 진행한 프로젝트 레포로써 현재는 각 브랜치별로 분리하여 학습 레포로 사용하고있습니다.

```
main : supabase에서 express, mongodb로 전환 및 활용해보는 학습 브랜치

supabase-test-blog : 과제 테스트 서버가 중단되어 대체로 supabase를 활용해보는 학습 브랜치

submit-test-blog : 과제 테스트를 진행한 브랜치
```

---

- express 서버 api 구성
- jwt 인증 토큰 구성 및 쿠키 인증 테스트를 위한 서버와 로컬 https 환경 설정
- mongodb 연동 및 스키마 정의
- presigned url로 이미지 업로드를 위한 aws s3 bucket 설정

---

##### 추가 및 수정

- 마이페이지 추가 구성
- 블로그 공감 및 검색 조회 추가
- ec2 배포 및 서버 https 구성
- 서버 및 클라이언트 인터셉트 쿠키 갱신 수정

---

#### 사용한 기술 스택 및 라이브러리

express, next.js, tanstack-query, typescript, tailwindcss, shadcn ui, react-hook-form, zod, jest, react testing library, mongodb
