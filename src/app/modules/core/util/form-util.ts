import {AbstractControl} from '@angular/forms';

export class FormUtil {

    static hasRequiredField(abstractControl: AbstractControl): boolean {
        if (abstractControl.validator) {
            const validator = abstractControl.validator({} as AbstractControl);
            if (validator && validator.required) {
                return true;
            }
        }
        if ((abstractControl as any).controls) {
            for (const controlName in (abstractControl as any).controls) {
                if ((abstractControl as any).controls[controlName]) {
                    if (this.hasRequiredField((abstractControl as any).controls[controlName])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
