import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromCamelCase'
})
export class FromCamelCasePipe implements PipeTransform {

  transform(value: any, args: any[] = null): any {
    return value.replace(/([A-Z])/g, ' $1')
  }

}
