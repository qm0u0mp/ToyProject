- 의존성 주입을 끝낸 상태라는 가정
- 포함된 의존성 : (data-jpa, security, jjwt)

#### JPS 의존성으로 인해 database가 연결되지 않으면 서버 실행이 안됨
1. application.properties 작업
1.1 server.port 지정
1.2 spring.datasource.url, username, password, driver-class-name 지정

#### Spring Security 의존성으로 인해 모든 메서드에 대해서 basic 인증을 요구함
2. WebSecurityConfig.java 작성
2.1 (REST API이면서 Basic 인증을 사용하지 않을때) basic 인증 미사용, CSRF 정책 미사용, session 생성 정책 미사용 적용
2.2 CORS 정책 지정 (Cross Origin Resource Sharing)

#### 모든 URL에 대해서 정상적으로 접근 가능
3. Provider 생성
3.1 환경 변수 (application.properties)에 secret-key 작성
3.2 (Bearer 인증 방식을 JWT로 할 때) JwtProvider.java 작성

4. Entity와 Repository 생성

5. Security Filter 작업

6. 공통 상수, 공통 메서드, 공통 클래스(인터페이스 포함) 작성

#### application.properties
#### 서버 포트 변경
server.port = 4000

spring.application.name=back

spring.mvc.throw-exception-if-no-handler-found=true
spring.web.resources.add-mappings=false

#### MySQL 데이터베이스 연결
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/estate?serverTimezone=UTC&characterEncoding=UTF-8
spring.datasource.username=developer
spring.datasource.password=P!ssw0rd

#### G-Mail SMTP 연결
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=99dngksmf@gmail.com
spring.mail.password=wxka byih jqib qpac
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true

#### sns 로그인
#### Kakao OAuth2 설정
spring.security.oauth2.client.registration.kakao.client-id=5ed8135064853a8f1499d87186e40e47
spring.security.oauth2.client.registration.kakao.client-secret=aiLKoLJ9qz9aMH2IaaRgjX2jlap2GAIR
spring.security.oauth2.client.registration.kakao.redirect-uri={baseUrl}/oauth2/callback/{registrationId}
spring.security.oauth2.client.registration.kakao.authorization-grant-type=authorization_code
spring.security.oauth2.client.registration.kakao.client-authentication-method=client_secret_post
spring.security.oauth2.client.registration.kakao.scope=profile_nickname

#### Kakao OAuth2 프로바이더 설정
spring.security.oauth2.client.provider.kakao.authorization-uri=https://kauth.kakao.com/oauth/authorize
spring.security.oauth2.client.provider.kakao.token-uri=https://kauth.kakao.com/oauth/token
spring.security.oauth2.client.provider.kakao.user-info-uri=https://kapi.kakao.com/v2/user/me
spring.security.oauth2.client.provider.kakao.user-name-attribute=id

#### Naver OAuth2 설정
spring.security.oauth2.client.registration.naver.client-id=UfMd_mcQgmZMV0DF5m9Q
spring.security.oauth2.client.registration.naver.client-secret=8nJquKJHtl
spring.security.oauth2.client.registration.naver.redirect-uri={baseUrl}/oauth2/callback/{registrationId}
spring.security.oauth2.client.registration.naver.authorization-grant-type=authorization_code
spring.security.oauth2.client.registration.naver.scope=email

#### Naver OAuth2 프로바이더 설정
spring.security.oauth2.client.provider.naver.authorization-uri=https://nid.naver.com/oauth2.0/authorize
spring.security.oauth2.client.provider.naver.token-uri=https://nid.naver.com/oauth2.0/token
spring.security.oauth2.client.provider.naver.user-info-uri=https://openapi.naver.com/v1/nid/me
spring.security.oauth2.client.provider.naver.user-name-attribute=response

#### JWT 비밀키
jwt.secret-key=5DF23CDE-70DF-40E4-A039-BEB90F9F7945
