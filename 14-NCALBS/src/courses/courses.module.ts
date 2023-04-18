import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schema/courses.scheme';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { PaginationMiddleware } from 'src/pagination/pagination.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Course.name,
        useFactory: () => {
          const schema = CourseSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes({
      path: 'v1/courses',
      method: RequestMethod.GET,
    });
  }
}
