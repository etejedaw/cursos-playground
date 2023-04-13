import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Rol } from 'src/decorators/rol/rol.decorator';
import { BrowserAgentGuard } from 'src/guards/browser-agent/browser-agent.guard';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';
import { RolesGuardGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { SlugPipe } from './pipes/slug/slug.pipe';

@ApiTags('courses')
@ApiBearerAuth()
@UseGuards(JwtGuardGuard, RolesGuardGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @HttpCode(201)
  @Rol(['admin'])
  create(@Req() req: Request, @Body() course: CreateCourseDto) {
    return this.coursesService.create(course);
  }

  @Get(':title')
  @Rol(['admin', 'manager'])
  find(@Param('title', SlugPipe) title: string) {
    return this.coursesService.findOne(title.length);
  }
}
