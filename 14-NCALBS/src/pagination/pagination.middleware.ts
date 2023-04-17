import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: RequestPaginate, res: Response, next: () => void) {
    const { limit = 5, page = 1 } = req.query;
    req.paginate = { limit, page };
    next();
  }
}

interface RequestPaginate extends Request {
  paginate: {
    limit: any;
    page: any;
  };
}
