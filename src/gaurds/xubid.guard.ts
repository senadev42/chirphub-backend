import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Birdhouse } from 'src/birdhouse/entities/birdhouse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class XUbidGuard implements CanActivate {
  constructor(
    @InjectRepository(Birdhouse)
    private birdhouseRepository: Repository<Birdhouse>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ubid = request.headers['x-ubid'];

    //Does it have the X-UBID header?
    if (!ubid) {
      throw new HttpException(
        'X-UBID header required to access this resource',
        HttpStatus.FORBIDDEN,
      );
    }

    //is it a valid uuid?
    if (!ubid.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/)) {
      throw new HttpException(
        'Invalid X-UBID provided',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const birdhouseId = request.params.id;
    const birdhouse = await this.birdhouseRepository.findOne({
      where: { ubid: ubid.toString() },
    });

    console.log("bird house", birdhouse);

    //Not found
    if (birdhouse == null) {
      let exception = new HttpException(
        'No registered birdhouse under this UBID',
        HttpStatus.NOT_FOUND,
      );
      Logger.error( exception);
      throw exception;
    }

    //No match
    if (birdhouseId !== birdhouse.id) {
      let exception = new HttpException(
        "Provided X-UBID doesn't have access to this birdhouse or it doesn't exist.",
        HttpStatus.UNAUTHORIZED,
      );
      Logger.error(exception);
      throw exception;
    }

    return true;
  }
}
