import axios from 'axios';
import { PostBoardRequestDto } from './dto/request';
import { GET_BOARD_LIST_URL, GET_BOARD_URL, GET_SEARCH_BOARD_LIST_URL, INCREASE_VIEW_COUNT_URL, POST_BOARD_REQUEST_URL } from 'src/constant';
import { bearerAuthorization, requestErrorHandler, requestHandler } from '..';
import ResponseDto from '../response.dto';
import { GetBoardListResponseDto, GetBoardResponseDto, GetSearchBoardListResponseDto } from './dto/response';

// Q&A 작성 API 함수 
export const postBoardRequest = async (requestBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_BOARD_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// Q&A 전체 리스트 불러오기 API 함수 
export const getBoardListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_BOARD_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetBoardListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// Q&A 검색 리스트 불러오기 API 함수 
export const getSearchBoardListRequest = async (searchWord: string, accessToken: string) => {
    const result = await axios.get(GET_SEARCH_BOARD_LIST_URL(searchWord), bearerAuthorization(accessToken))
        .then(requestHandler<GetSearchBoardListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// Q&A 게시물 불러오기 API 함수 
export const getBoardRequest = async (receptionNumber: number | string, accessToken: string) => {
    const result = await axios.get(GET_BOARD_URL(receptionNumber), bearerAuthorization(accessToken))
        .then(requestHandler<GetBoardResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// Q&A 게시물 조회수 증가 API 함수
// post, put, catch는 requestBody를 포함하여 전송할 수 있음
export const getBoardViewCountRequest = async (receptionNumber: number | string, accessToken: string) => {
    const result = await axios.patch(INCREASE_VIEW_COUNT_URL(receptionNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};