import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schema/courses.scheme';

interface ModelExt<T> extends Model<T> {
  paginate: (searchParams: any, options?: any) => any;
}

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: ModelExt<CourseDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const user = this.userModel.find();
    return this.courseModel.create(createCourseDto);
  }

  async findAll(pagination: any) {
    const listPaginate = this.courseModel.paginate({}, pagination);
    const list = listPaginate.docs.aggregate([
      {
        $lookup: {
          from: 'users',
          foreignField: 'id',
          localField: 'idAuthor',
          as: 'author',
          pipeline: [
            {
              $project: {
                _id: 0,
                name: 1,
                email: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: '$author',
      },
    ]);
    return list;
  }

  async findOne(id: string) {
    return this.courseModel.findOne({ id });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findOneAndUpdate({ id }, updateCourseDto, {
      upsert: true,
      new: true,
    });
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id);
    const response = this.courseModel.deleteOne({ _id });
    return response;
  }
}
