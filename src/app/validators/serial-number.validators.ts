import { AbstractControl, ValidationErrors } from "@angular/forms";

export class SerialNumberValidators {
    static uniqueSerialNumber(control: AbstractControl) : Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'king'){
                    resolve({ uniqueSerialNumber: true})
                } else {
                resolve(null)
                }
            }, 2000)
        })
    }
}
