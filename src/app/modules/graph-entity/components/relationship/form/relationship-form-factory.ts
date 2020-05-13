import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {InputLengthConfig} from '@core/constants/input-length-config';
import {HttpValidator} from '@core/util/http-validator';
import {RelationshipTO} from '@graphwiki/graph-service-api';

export enum RelationshipFormAttributes {
    SOURCE = 'source',
    TARGET = 'target',
    INFORMATION_SOURCE = 'informationSource',
    DESCRIPTION = 'description',
    TYPE = 'type'
}

export function createRelationshipForm(fb: FormBuilder): FormGroup {
    return fb.group({
            [RelationshipFormAttributes.SOURCE]: fb.control(null, [Validators.required]),
            [RelationshipFormAttributes.TARGET]: fb.control(null, [Validators.required]),
            [RelationshipFormAttributes.INFORMATION_SOURCE]: fb.control(null, [
                Validators.required,
                Validators.maxLength(InputLengthConfig.INFORMATION_SOURCE),
                HttpValidator.urlValidator()
            ]),
            [RelationshipFormAttributes.DESCRIPTION]:
                fb.control(null, Validators.maxLength(InputLengthConfig.TEXT_LONG_DEFAULT_MAX_LENGTH)),
            [RelationshipFormAttributes.TYPE]: fb.control(null, [Validators.required])
        }, {
            ['validator']: uniqueVertex
        }
    );
}

export function fillRelationshipForm(form: FormGroup, relationship: RelationshipTO) {
    form.get(RelationshipFormAttributes.SOURCE).setValue(relationship.source.id);
    form.get(RelationshipFormAttributes.TARGET).setValue(relationship.target.id);
    form.get(RelationshipFormAttributes.INFORMATION_SOURCE).setValue(relationship.informationSource);
    form.get(RelationshipFormAttributes.DESCRIPTION).setValue(relationship.description);
    form.get(RelationshipFormAttributes.TYPE).setValue(relationship.type);
}


export function uniqueVertex(control: AbstractControl): ValidationErrors | null {
    const sourceControl = control.get([RelationshipFormAttributes.SOURCE]);
    const targetControl = control.get([RelationshipFormAttributes.TARGET]);

    if (sourceControl.value !== null && targetControl.value !== null && sourceControl.value === targetControl.value) {
        return {uniqueVertex: true};
    } else {
        return null;
    }
}
