package com.estate.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.estate.back.dto.request.board.PostBoardRequestDto;
import com.estate.back.dto.request.board.PostCommentRequestDto;
import com.estate.back.dto.request.board.PutBoardRequestDto;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.board.GetBoardListResponseDto;
import com.estate.back.dto.response.board.GetBoardResponseDto;
import com.estate.back.dto.response.board.GetSearchBoardListResponseDto;
import com.estate.back.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/")
    ResponseEntity<ResponseDto> postBoard(
            @RequestBody @Valid PostBoardRequestDto requestBody,
            @AuthenticationPrincipal String userId) {
        ResponseEntity<ResponseDto> response = boardService.postBoard(requestBody, userId);
        return response;
    }

    // USER / ADMIN -> USER면 AF / ADMIN이면 send했을 시 SU, 똑같은 주소로 한번 더 send했을 시 WC
    // request body 잘못 -> VF
    // 존재하지 않는 게시물 번호 -> NB
    // 관리자 토큰 : 이미 작성된 답글 -> WC
    // 성공 시 SU
    @PostMapping("/{receptionNumber}/comment")
    public ResponseEntity<ResponseDto> postComment(
            @RequestBody @Valid PostCommentRequestDto requestBody,
            @PathVariable("receptionNumber") int receptionNumber) {
        ResponseEntity<ResponseDto> response = boardService.postComment(requestBody, receptionNumber);
        return response;
    }

    @GetMapping("/list")
    public ResponseEntity<? super GetBoardListResponseDto> getBoardList() {
        ResponseEntity<? super GetBoardListResponseDto> response = boardService.getBoardList();
        return response;
    }

    @GetMapping("/list/search")
    public ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(
            @RequestParam("word") String searchWord) {
        ResponseEntity<? super GetSearchBoardListResponseDto> response = boardService.getSearchBoardList(searchWord);
        return response;
    }

    // 토큰값 넣어서 SU 확인 -> 결과 : viewCount 1 증가
    // 토큰 값 뺀 상태에서 AF, NB 확인
    @GetMapping("/{receptionNumber}")
    public ResponseEntity<? super GetBoardResponseDto> getBoard(
            @PathVariable("receptionNumber") int receptionNumber) {
        ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(receptionNumber);
        return response;
    }

    // 토큰 값 없이 -> AF
    // 토큰 값 있는 상태에서 리퀘스트 바디 값 없이 -> VF
    // 토큰 값 있는 상태에서 존재하지 않는 접수번호 -> NB
    // 토큰 값 있는 상태(관리자) 작성자가 아닐 때 -> AF
    // 토큰 값 있는 상태(사용자) 답글이 달린 상태 -> WC
    @PutMapping("/{receptionNumber}")
    public ResponseEntity<ResponseDto> putBoard(
            @RequestBody @Valid PutBoardRequestDto requestBody,
            @PathVariable("receptionNumber") int receptionNumber,
            @AuthenticationPrincipal String userId) {
        ResponseEntity<ResponseDto> response = boardService.putBoard(requestBody, receptionNumber, userId);
        return response;
    }

    // 토큰 값 넣어서 SU 확인 -> viewCount 1 증가시킴
    // 토큰 값 뺀 상태에서 AF, NB 확인
    @PatchMapping("/{receptionNumber}/increase-view-count")
    public ResponseEntity<ResponseDto> increaseViewCount(
            @PathVariable("receptionNumber") int receptionNumber) {
        ResponseEntity<ResponseDto> response = boardService.increaseViewCount(receptionNumber);
        return response;
    }

    // 토큰 값 넣어서 SU 확인 -> 사용자 계정
    // 토큰 갑 넣어서 존재하지 않는 게시물 번호 입력 시 -> NB
    // 토큰 값 뺀 상태에서 AF(Authorization Failed)
    // 토큰 값 넣어서 (관리자 계정) AF(Authorization Failed) -> 관리자는 삭제 권한 없음
    @DeleteMapping("/{receptionNumber}")
    public ResponseEntity<ResponseDto> deleteBoard(
            @PathVariable("receptionNumber") int receptionNumber,
            @AuthenticationPrincipal String userId) {
        ResponseEntity<ResponseDto> response = boardService.deleteBoard(receptionNumber, userId);
        return response;
    }
}