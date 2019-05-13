import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], key: string,args?: any): any[] {
    if (!value) { return null; }
    if (!args) { return value; }

    args = args.toLowerCase();
    if(key==='user')
      return this.FilterUser(value,args);
    else
     return value;
  
  
  }
  FilterUser(value: any[],args:any):any[]{
    return value.filter(it => {
      if((it.FirstName.toLowerCase().indexOf(args.toLowerCase()) == -1) && 
         (it.LastName.toLowerCase().indexOf(args.toLowerCase()) == -1) &&
         (JSON.stringify(it.EmployeeId).toLowerCase().indexOf(args.toLowerCase()) == -1)
      )
       return false;
      else
       return true;
    });

  }
  

  
   
};


