import { Injectable } from '@nestjs/common';
import { DBServices } from '../../db.service';

@Injectable()
export class MicroOrmService implements DBServices {
  save() {
    return { token: 'zdsadfsd' };
  }
}
