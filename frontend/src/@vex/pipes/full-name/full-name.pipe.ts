import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../../../app/pages/my-shop/services/users.service';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: User | null, ...args: unknown[]): string {
    if (value == null) {
      return 'guest';
    }
    return value.first_name + ' ' + value.last_name;
  }

}
