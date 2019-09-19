import { FormGroup } from '@angular/forms';
import { FORMS_MESSAGES } from 'src/app/shared/constants';

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ 'mustMatch': {
                message: FORMS_MESSAGES.confirmPassword.mustMatch
            } });
        } else {
            matchingControl.setErrors(null);
        }
    }
}