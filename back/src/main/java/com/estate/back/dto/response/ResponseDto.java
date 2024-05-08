package com.estate.back.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

// Response의 공통 형태
@Getter
@AllArgsConstructor
public class ResponseDto {
    private String code;
    private String message;

    // 성공
    public static ResponseEntity<ResponseDto> success() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    // 필수 데이터 미입력
    public static ResponseEntity<ResponseDto> validationFailed() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.VALIDATION_FAILED, ResponseMessage.VALIDATION_FAILED);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    // 중복된 아이디
    public static ResponseEntity<ResponseDto> duplicatedId() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_ID, ResponseMessage.DUPLICATED_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    // 중복된 이메일
    public static ResponseEntity<ResponseDto> duplicatedEmail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_EMAIL, ResponseMessage.DUPLICATED_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    // 존재하지 않는 게시물
    public static ResponseEntity<ResponseDto> noExistBoard() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_BOARD, ResponseMessage.NO_EXIST_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    // 이미 작성된 답글
    public static ResponseEntity<ResponseDto> writtenComment() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.WRITTEN_COMMENT, ResponseMessage.WRITTEN_COMMENT);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    // 로그인 정보 불일치
    public static ResponseEntity<ResponseDto> signInFailed() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.SIGN_IN_FAILED, ResponseMessage.SIGN_IN_FAILED);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    // 이메일 인증 실패
    public static ResponseEntity<ResponseDto> authenticationFailed() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.AUTHENTICATION_FAILED,
                ResponseMessage.AUTHENTICATION_FAILED);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    // 게시물 삭제
    public static ResponseEntity<ResponseDto> authorizationFailed() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.AUTHORIZATION_FAILED,
                ResponseMessage.AUTHORIZATION_FAILED);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseBody);
    }

    // 404 Not Found 처리
    public static ResponseEntity<ResponseDto> notFound() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_FOUND,
                ResponseMessage.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
    }

    // 토큰 생성 실패
    public static ResponseEntity<ResponseDto> tokenCreationFailed() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.TOKEN_CREATION_FAILED,
                ResponseMessage.TOKEN_CREATION_FAILED);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    // 이메일 전송 실패
    public static ResponseEntity<ResponseDto> mailSendFailed() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.MAIL_SEND_FAILED, ResponseMessage.MAIL_SEND_FAILED);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    // 데이터베이스 오류
    public static ResponseEntity<ResponseDto> databaseError() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
