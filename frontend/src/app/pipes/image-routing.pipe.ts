import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageRouting'
})
export class ImageRoutingPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return null;
  }

}
