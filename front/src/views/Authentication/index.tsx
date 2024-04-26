import React, { ChangeEvent, useState } from 'react'
import './style.css';
import SignInBackground from 'src/assets/image/sign-in-background.png';
import SignUpBackground from 'src/assets/image/sign-up-background.png';
import InputBox from 'src/components/Inputbox';
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto } from 'src/apis/auth/dto/request';
import { EmailAuthRequest, IdCheckRequest } from 'src/apis/auth';
import ResponseDto from 'src/apis/response.dto';

type AuthPage = 'sign-in'|'sign-up';

// SNS ==========================================================================================================
interface SnsContainerProps{
  title: String;
}

function SnsContainer({title} : SnsContainerProps) {

  const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
    alert(type);
  }
  
  return (
    <div className='authentication-sns-container'>
      <div className='sns-container-title label'>{title}</div>
      <div className='sns-button-container'>
        <div className='sns-button kakao-button'onClick={() => onSnsButtonClickHandler('kakao')}></div>
        <div className='sns-button naver-button' onClick={() => onSnsButtonClickHandler('naver')}></div>
      </div>
    </div>
  );
}

// 로그인 ==========================================================================================================
interface Props{
  onLinkClickHandler: () => void 
}

function SignIn({onLinkClickHandler} : Props) {

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
    setMessage('');
  }

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setMessage('');
  }

  const onSignInButtonClickHandler = () => {
    const ID = 'service123';
    const PASSWORD = 'qwer1234';

    const isSuccess = id === ID && password === PASSWORD;
    if(isSuccess){
      setId('');
      setPassword('');
      alert('로그인 성공');
    } else {
      setMessage('로그인 정보가 일치하지 않습니다.');
    }
  };

  return(
    <div className='authentication-contents'>
      <div className='authentication-input-container'>
        <InputBox 
          label='아이디' 
          type='text'
          value={id}
          placeholder='아이디를 입력해주세요.'
          onChangeHandler={onIdChangeHandler}
        />
        <InputBox 
          label='비밀번호' 
          type='password'
          value={password}
          placeholder='비밀번호를 입력해주세요.'
          onChangeHandler={onPasswordChangeHandler}
          message={message} error
        />
      </div>
      <div className='authentication-button-container'>
        <div className="primary-button full-width" onClick={onSignInButtonClickHandler}>로그인</div>
        <div id="sign-up-link" className="text-link" onClick={onLinkClickHandler}>회원가입</div>
      </div>
      <div className='short-divider'></div>
      <SnsContainer title='SNS 로그인'/>
    </div>
  )
}

// 회원가입 ==========================================================================================================
function SignUp({onLinkClickHandler}: Props){

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');

  const [idButtonStatus, setIdButtonStatus] = useState<boolean>(false);
  const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
  const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

  const [isIdCheck, setIdCheck] = useState<boolean>(false);
  const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
  const [isEqualPassword, setEqualPassword]  = useState<boolean>(false);
  const [isEmailCheck, setEmailCheck] = useState<boolean>(false);
  const [isAuthNumberCheck, setAuthNumberCheck] = useState<boolean>(false);

  const [idMessage, setIdMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [authNumberMessage, setAuthNumberMessage] = useState<string>('');

  const [isIdError, setIdError] = useState<boolean>(false);
  const [isEmailError, setEmailError] = useState<boolean>(false);
  const [isAuthNumberError, setAuthNumberError] = useState<boolean>(false);

  const isSignUpActive = isIdCheck && isEmailCheck && isAuthNumberCheck && isPasswordPattern && isEqualPassword;

  // 아이디 중복 확인 버튼
  const idCheckResponse = (result : ResponseDto | null) => {

    const idMessage = !result ? '서버에 문제가 있습니다.' :
    result.code === 'VF' ?  '아이디는 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
    result.code === 'DI' ? '이미 사용중인 아이디입니다.' :
    result.code === 'DBE' ? '서버에 문제가 있습니다.' :
    result.code ===  'SU' ? '사용 가능한 아이디입니다.' : '';

    const idError = !(result && result.code === 'SU'); 
    const idCheck = !idError;

    setIdMessage(idMessage);
    setIdError(idError);
    setIdCheck(idCheck);

    // 밑에 코드를 간단히 바꿔서 적은게 위에 코드
    /* if(!result) {
      setIdMessage('서버에 문제가 있습니다.');
      setIdError(true);
      setIdCheck(false);
      
      return;
    }

    const { code } = result; // const code = result.code; 

    if(code === 'VF'){
      setIdMessage('아이디는 빈 값 혹은 공백으로만 이루어질 수 없습니다.');
      setIdError(true);
      setIdCheck(false);
      
      return;
    }

    if(code === 'DI'){
      setIdMessage('이미 사용중인 아이디입니다.');
      setIdError(true);
      setIdCheck(false);
      
      return;
    }

    if(code === 'DBE'){
      setIdMessage('서버에 문제가 있습니다.');
      setIdError(true);
      setIdCheck(false);
      
      return;
    }

    if(code === 'SU') {
      setIdMessage('사용 가능한 아이디입니다.');
      setIdError(false);
      setIdCheck(true);
      
      return;
    } */
  };

  // 이메일 인증 버튼
  const emailAuthResponse = (result : ResponseDto | null) => {
    const emailMessage = !result ? '서버에 문제가 있습니다.' : 
    result.code === 'VF' ? '이메일 형식이 아닙니다.' :
    result.code === 'DE' ? '중복된 이메일입니다.' :
    result.code === 'MF' ? '인증번호 전송에 실패하였습니다.' :
    result.code === 'DBE' ? '서버에 문제가 있습니다.' : 
    result.code === 'SU' ? '인증번호가 전송되었습니다.' : ''

    const emailCheck = result !== null && result.code === 'SU';
    const emailError = !emailCheck;

    setEmailMessage(emailMessage);
    setEmailCheck(emailCheck);
    setEmailError(emailError);
  };

  // 회원가입 버튼 색상 변경
  // css => primary-button full-width / disable-button full-width
  const signUpButtonClass = isSignUpActive ? 'primary-button full-width' : 'disable-button full-width';
  // const signUpButtonClass = (isSignUpActive ? 'primary' : 'disable') + '-button full-width';
  // const signUpButtonClass = `${isSignUpActive ? 'primary' : 'disable' }-button full-width`;

  // 아이디
  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setId(value);
    setIdButtonStatus(value !== '');  
    setIdCheck(false);
    setIdMessage('');
};

  // 비밀번호
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;

    const isPasswordPattern = passwordPattern.test(value);
    setPasswordPattern(isPasswordPattern);

    const passwordMessage = 
        isPasswordPattern ? '' : 
        value ? '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.' : '';
    setPasswordMessage(passwordMessage);
    
    /////////

    const isEqualPassword = passwordCheck === value;
    setEqualPassword(isEqualPassword);

    const passwordCheckMessage = 
        isEqualPassword ? '' : 
        passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
    setPasswordCheckMessage(passwordCheckMessage);
};

  // 비밀번호 확인
  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPasswordCheck(value);

    const isEqualPassword = password === value;
    setEqualPassword(isEqualPassword);

    const passwordCheckMessage = 
        isEqualPassword ? '' : 
        value ? '비밀번호가 일치하지 않습니다.' : '';
    setPasswordCheckMessage(passwordCheckMessage);
};

  // 이메일
  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailButtonStatus(value !== '');
    setEmailCheck(false);
    setAuthNumberCheck(false);
    setEmailMessage('');
  }

  // 이메일 확인
  const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAuthNumber(value);
    setAuthNumberButtonStatus(value !== '');
    setAuthNumberCheck(false);
    setAuthNumberMessage('');
  }

  // 아이디 중복확인
  const onIdButtonClickHandler = () => {
    if(!idButtonStatus) {
      return
    }

    // trim : 앞,뒤 공백 제거
    if(!id || !id.trim()) {
      return
    }

    const requestBody : IdCheckRequestDto = { userId: id };
    IdCheckRequest(requestBody).then(idCheckResponse);

  //   // admin으로 id를 입력하지 않았을 시 동작하도록 함
  //   const idCheck = id !== 'admin';
  //   setIdCheck(idCheck);
  //   setIdError(!idCheck);

  //   const idMessage = idCheck ? '사용 가능한 아이디입니다.' : '이미 사용중인 아이디입니다.';
  //   setIdMessage(idMessage);
  }

  // 이메일 인증
  const onEmailButtonClickHandler = () => {
    if(!emailButtonStatus) {
      return;
    }

    const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9]*.\.[a-zA-Z]{2,4})$/

    const isEmailPattern = emailPattern.test(email);
    if (!isEmailPattern) {
      setEmailMessage('이메일 형식이 아닙니다.');
      setEmailError(true);
      setEmailCheck(false);
      return;
    }
    const requestBody: EmailAuthRequestDto = {userEmail: email};
    EmailAuthRequest(requestBody).then(emailAuthResponse);
  }

  // 이메일 인증번호 확인
  const onAuthNumberButtonClickHandler = () => {
    if(!authNumberButtonStatus) {
      return;
    }
    
    const authNumberCheck = authNumber === '1234';
    setAuthNumberCheck(authNumberCheck);    
    setAuthNumberError(!authNumberCheck);

    const authNumberMessage = authNumberCheck ? '인증번호가 확인되었습니다.' : '인증번호가 일치하지 않습니다.';
    setAuthNumberMessage(authNumberMessage);
};

// 회원가입 버튼
  const onSignUpButtonClickHandler = () => {
    // 모든 항목을 입력하지 않았는데 회원가입 버튼 클릭 시 동작하는 것을 방지하기 위함
    if(!isSignUpActive){
      return;
    }

    alert('회원가입');
  }

  return(
    <div className="authentication-contents">
            <SnsContainer title="SNS 회원가입" />
            <div className="short-divider"></div>
            <div className="authentication-input-container">
                <InputBox 
                  label="아이디" 
                  type="text" 
                  value={id} 
                  placeholder="아이디를 입력해주세요" 
                  onChangeHandler={onIdChangeHandler} 
                  buttonTitle="중복 확인" 
                  buttonStatus={idButtonStatus} 
                  onButtonClickHandler={onIdButtonClickHandler}
                  message={idMessage}
                  error={isIdError}
                />

                <InputBox 
                  label="비밀번호" 
                  type="password" 
                  value={password} 
                  placeholder="비밀번호를 입력해주세요" 
                  onChangeHandler={onPasswordChangeHandler} 
                  message={passwordMessage} error
                />

                <InputBox 
                  label="비밀번호 확인" 
                  type="password" 
                  value={passwordCheck} 
                  placeholder="비밀번호를 입력해주세요" 
                  onChangeHandler={onPasswordCheckChangeHandler}
                  message={passwordCheckMessage} error
                />

                <InputBox 
                  label="이메일" 
                  type="text" 
                  value={email} 
                  placeholder="이메일을 입력해주세요" 
                  onChangeHandler={onEmailChangeHandler} 
                  buttonTitle="이메일 인증" 
                  buttonStatus={emailButtonStatus} 
                  onButtonClickHandler={onEmailButtonClickHandler}
                  message={emailMessage}
                  error={isEmailError}
                  />

                {isEmailCheck && 
                  <InputBox 
                    label="인증번호" 
                    type="text" 
                    value={authNumber} 
                    placeholder="인증번호 4자리를 입력해주세요" 
                    onChangeHandler={onAuthNumberChangeHandler} 
                    buttonTitle="인증 확인" 
                    buttonStatus={authNumberButtonStatus} 
                    onButtonClickHandler={onAuthNumberButtonClickHandler}
                    message={authNumberMessage}
                    error={isAuthNumberError}
                  />
                }
            </div>

            <div className="authentication-button-container">
                <div className={signUpButtonClass} onClick={onSignUpButtonClickHandler}>회원가입</div>
                <div className="text-link" onClick={onLinkClickHandler}>로그인</div>
            </div>
        </div>
  )
}

// 브라우저 ==========================================================================================================
export default function Authentication() {
  
  const [page, setPage] = useState<AuthPage>('sign-up');
  
  const onLinkClickHandler = () => {
    if(page === 'sign-in'){
      setPage('sign-up');
    } else {
      setPage('sign-in');
    }
  }

  const AuthenticationContents = page === 'sign-in' ? <SignIn onLinkClickHandler={onLinkClickHandler}/> : <SignUp onLinkClickHandler={onLinkClickHandler}/>;

  const imageBoxStyle = {backgroundImage: `url(${page === 'sign-in' ? SignInBackground : SignUpBackground})`}

  return( 
    <div id="authentication-wrapper">
      <div className='authentication-image-box' style={imageBoxStyle}></div>
      <div className='authentication-box'>
        <div className='authentication-container'>
          <div className='authentication-title h1'>{'임대 주택 가격 서비스'}</div>
          {AuthenticationContents}
        </div>
      </div>
  </div>
  );
}
