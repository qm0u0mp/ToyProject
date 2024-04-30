import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router';
import { AUTH_ABSOLUTE_PATH, AUTH_PATH, LOCAL_ABSOLUTE_PATH, LOCAL_PATH, QNA_DETAIL_PATH, QNA_PATH, QNA_UPDATE_PATH, QNA_WRITE_PATH, RATIO_PATH, SERVICE_PATH, SNS_PATH } from './constant';
import Authentication, { Sns } from './views/Authentication';
import Local from './service/Local';
import Ratio from './service/Ratio';
import QnaList from './service/qna/QnaList';
import QnaWrite from './service/qna/QnaWrite';
import QnaDetail from './service/qna/QnaDetail';
import QnaUpdate from './service/qna/QnaUpdate';
import NotFound from './layouts/ServiceContainer';
import { useCookies } from 'react-cookie';
import ServiceContainer from './layouts/ServiceContainer';

// authentication (로그인, 회원가입)
// service
// - local (지역 평균)
// - ratio (비율 계산)
// - qna (Q&A 리스트)
//    - : receptionNumber (QnA 상세보기)
// - write (QnA 작성)
// - update/:receptionNumber (QnA 수정)

// root 경로 컴포넌트
function Index() {
  
  // state
  const [cookies] = useCookies();

  // function
  const navigator = useNavigate();

  // effect
  useEffect(() => {
    const accessToken = cookies.accessToken;

    if(accessToken) { // 로그인이 되어있는 상태
      navigator(LOCAL_ABSOLUTE_PATH);
    } else { // 로그인이 안되어있는 상태
      navigator(AUTH_ABSOLUTE_PATH);
    }

  }, []);
  
  // render
  return<></>;
}

// Application 컴포넌트
function App() {

  // render
  return (
    <Routes>
      <Route index element={<Index/>} />
      <Route path={SNS_PATH} element={<Sns />} />
      <Route path={AUTH_PATH} element={<Authentication/>} /> 
      <Route path={SERVICE_PATH} element={<ServiceContainer/>}>
        <Route path={LOCAL_PATH} element={<Local/>}/>
        <Route path={RATIO_PATH} element={<Ratio/>}/>
        <Route path={QNA_PATH}>
          <Route index element={<QnaList/>}/>
          <Route path={QNA_WRITE_PATH} element={<QnaWrite/>}/> 
          <Route path={QNA_DETAIL_PATH} element={<QnaDetail/>}/>       
          <Route path={QNA_UPDATE_PATH} element={<QnaUpdate/>}/>
        </Route>        
      </Route>
      <Route path='*' element={<NotFound/>} />
    </Routes>
  );
}

export default App;