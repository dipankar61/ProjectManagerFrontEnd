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
    if(key==='Project')
      return this.FilterProject(value,args);
    if(key==='parenttask')
      return this.FilterParentTask(value,args);
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
  FilterProject(value: any[],args:any):any[]{
    return value.filter(it => {
      if((it.ProjectName.toLowerCase().indexOf(args.toLowerCase()) == -1) && 
         (JSON.stringify(it.StartDate).toLowerCase().indexOf(args.toLowerCase()) == -1) &&
         (JSON.stringify(it.EndDate).toLowerCase().indexOf(args.toLowerCase()) == -1) &&
         (JSON.stringify(it.Priority).toLowerCase().indexOf(args.toLowerCase()) == -1)
      )
       return false;
      else
       return true;
    });
    

  }
  FilterParentTask(value: any[],args:any):any[]{
    return value.filter(it => {
      if((it.TaskName.toLowerCase().indexOf(args.toLowerCase()) == -1))
       return false;
      else
       return true;
    });
    

  }
  

  
   
};


