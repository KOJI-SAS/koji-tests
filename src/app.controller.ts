import { Controller, Get, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from "@nestjs/platform-express";


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.postMarkdown(file);
  }
}
