import { FormGroup } from '@angular/forms';
export function DateComparison(startDatecontrolName: string, EndDateControlName: string, checkcontrolName:string) {
    return (formGroup: FormGroup) => {
        const checkboxControl = formGroup.controls[checkcontrolName];
        const stcontrol = formGroup.controls[startDatecontrolName];
        const endControl = formGroup.controls[EndDateControlName];
        if (checkboxControl.value===true)
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