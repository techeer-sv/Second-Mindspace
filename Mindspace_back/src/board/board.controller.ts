import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BoardService } from './board.service';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import { BoardResponseDto } from './dto/board-response.dto';
import { BoardNodeResponseDto } from './dto/board-node-response.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { SpecificBoardNodeDto } from './dto/specific-board-node.dto';
import { BoardDetailDto } from './dto/board-detail.dto';
import { ImageUploadDto } from './dto/image-upload.dto';

@ApiTags('Board')
@Controller('api/v1/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: '노드별 모든 게시글 조회' })
  @ApiQuery({
    name: 'node_id',
    description: '조회하려는 노드의 ID',
    required: true,
    type: Number,
  })
  @Get()
  async getAllBoardsByNodeId(
    @Query('node_id') nodeId: number,
  ): Promise<BoardNodeResponseDto[]> {
    return await this.boardService.getAllBoardsByNodeId(nodeId);
  }

  @ApiOperation({ summary: '게시글 생성' })
  @ApiQuery({ name: 'node_id', description: '게시글을 작성할 노드의 ID' })
  @ApiHeader({ name: 'user_id', description: '사용자 ID' })
  @ApiResponse({ status: 201, description: '게시글 작성 성공', type: Board }) // 201 Created response
  @ApiResponse({ status: 500, description: '서버 오류' }) // 500 Internal Server Error response
  @Post()
  async createBoard(
    @Query('node_id') nodeId: number,
    @Headers('user_id') userIdHeader: string,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<BoardResponseDto> {
    // <-- 변경된 반환 타입
    const userId = userIdHeader; // 문자열로 변환
    return this.boardService.createBoard(nodeId, userId, createBoardDto);
  }

  @ApiOperation({ summary: '게시글 수정' })
  @ApiQuery({ name: 'node_id', description: '게시글을 작성할 노드의 ID' })
  @ApiHeader({ name: 'user_id', description: '사용자 ID' })
  @ApiResponse({ status: 201, description: '게시글 작성 성공', type: Board }) // 201 Created response
  @ApiResponse({ status: 500, description: '서버 오류' }) // 500 Internal Server Error response
  @Put()
  async updateBoard(
    @Query('node_id') nodeId: number,
    @Headers('user_id') userId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<BoardResponseDto> {
    return this.boardService.updateBoard(nodeId, userId, updateBoardDto);
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @ApiQuery({ name: 'node_id', description: '게시글을 삭제할 노드의 ID' })
  @ApiHeader({ name: 'user_id', description: '사용자 ID' })
  @ApiResponse({ status: 201, description: '게시글 삭제 성공', type: Board }) // 201 Created response
  @ApiResponse({ status: 500, description: '서버 오류' }) // 500 Internal Server Error response
  @Delete()
  async deleteOwnBoard(
    @Query('node_id') nodeId: number,
    @Headers('user_id') userId: string,
  ) {
    return this.boardService.deleteOwnBoard(nodeId, userId);
  }

  @ApiOperation({ summary: '특정 노드의 사용자 게시글 조회' })
  @ApiQuery({
    name: 'node_id',
    description: '조회하려는 노드의 ID',
    required: true,
    type: Number,
  })
  @ApiHeader({
    name: 'user_id',
    description: '사용자 ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '게시글 조회 성공',
    type: SpecificBoardNodeDto,
  })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없습니다.' })
  @Get()
  async getBoardByNodeId(
    @Query('node_id') nodeId: number,
    @Headers('user_id') userIdHeader: string,
  ): Promise<SpecificBoardNodeDto> {
    const userId = parseInt(userIdHeader);
    return await this.boardService.getBoardByNodeIdAndUserId(nodeId, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 게시글 조회' })
  @ApiResponse({
    status: 200,
    description: '게시글 조회 성공',
    type: BoardDetailDto,
  })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없습니다.' })
  async getBoardDetail(@Param('id') id: number): Promise<BoardDetailDto> {
    return this.boardService.getBoardDetailById(id);
  }

  // @Post('upload') // 이미지 업로드 API 엔드포인트
  // async uploadImage(@Body() body: any) {
  //   return uploadFile(body);
  // }

  /**
   * [POST] /boards/image - 게시글 작성/수정시 이미지 업로드 API
   * @param file - 업로드한 이미지 파일
   * @param imageUploadDto - 사진 업로드시 포함된 게시글 아이디
   * @returns 업로드된 이미지의 URL 반환
   */
  // @ApiImageUpload('게시글 작성/수정시 이미지 업로드 API')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  @Post('image')
  async imageUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() imageUploadDto: ImageUploadDto,
  ) {
    const imageUrl = await this.boardService.saveImage(file, imageUploadDto);
    return imageUrl;
  }
}
