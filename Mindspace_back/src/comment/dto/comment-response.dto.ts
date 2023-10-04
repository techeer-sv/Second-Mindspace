import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty({ description: '댓글의 ID' })
  id: number;

  @ApiProperty({ description: '댓글을 작성한 사용자의 닉네임' })
  userNickname: string;

  @ApiProperty({ description: '댓글의 내용' })
  content: string;

  @ApiProperty({ description: '댓글의 마지막 업데이트 시간' })
  updatedAt: string;
}
