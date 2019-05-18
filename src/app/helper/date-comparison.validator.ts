import { FormGroup } from '@angular/forms';

export function DateComparison(startDatecontrolName: string, EndDateControlName: string, checkcontrolName:string,componentName:string) {
    return (formGroup: FormGroup) => {
        const checkboxControl = formGroup.controls[checkcontrolName];
        const stcontrol = formGroup.controls[startDatecontrolName];
        const endControl = formGroup.controls[EndDateControlName];
        if ((checkboxControl.value===true && componentName==="project") || (checkboxControl.value===false && componentName==="addtask"))
        {
            if(stcontrol.value !=="" && stcontrol.value !==undefined && endControl.value !=="" && endControl.value !==undefined)
            {
                if(stcontrol.value>endControl.value)
                {
                    endControl.setErrors({ DateComparison: true });
                }
                else{
                    endControl.setErrors(null);
                }

            }
            else{
                endControl.setErrors({ DateComparison: true });

            }

        }
        else
        {
            endControl.setErrors(null);
        }

       
    }
}