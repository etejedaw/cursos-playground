import {
	Controller,
	Get,
	Param,
	Post,
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
	@Post()
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: './uploads',
				filename(_: Request, file: Express.Multer.File, callback) {
					const date = new Date();
					const name = date.getTime();
					return callback(null, `${name}${extname(file.originalname)}`);
				},
			}),
		}),
	)
	uploadFile(@UploadedFile() file) {
		return { url: `http://localhost:8000/api/${file.path}` };
	}

	@Get(':path')
	async getImage(@Param('path') path: string, @Res() res: Response) {
		res.sendFile(path, { root: 'uploads' });
	}
}
