import {Component, Input, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RelationshipFormAttributes} from '@graph-entity/components/relationship/form/relationship-form-factory';
import {LabelValueEntity} from '@core/entities/label-value.entities';
import {RelationshipType, SearchCompanyRecord, SearchPersonRecord, VertexTO} from '@graphwiki/graph-service-api';
import {HttpGenericService} from '@src/services/http-generic.service';
import {filter} from 'rxjs/operators';
import {SearchComponent} from '@search/components/search/search.component';

@Component({
    selector: 'app-relationship-form',
    templateUrl: 'relationship-form.component.html',
    styleUrls: ['relationship-form.component.scss']
})
export class RelationshipFormComponent {

    @Input()
    relationshipForm: FormGroup;
    @Input()
    adjacentVerticesChangeAvailable = true;
    @Input()
    source: VertexTO;
    @Input()
    target: VertexTO;

    @ViewChildren(SearchComponent)
    searchInputs: SearchComponent[];

    sourceVertexFormControl: FormControl;
    targetVertexFormControl: FormControl;
    RelationshipFormAttributes = RelationshipFormAttributes;
    relationshipTypeOptions: LabelValueEntity[] = Object.keys(RelationshipType).map(key => {
        return {label: RelationshipType[key], value: RelationshipType[key]};
    });

    constructor(private http: HttpGenericService, fb: FormBuilder) {
        this.sourceVertexFormControl = fb.control(null);
        this.targetVertexFormControl = fb.control(null);

        this.sourceVertexFormControl.valueChanges
            .pipe(filter(value => value !== null))
            .subscribe((record: SearchPersonRecord | SearchCompanyRecord) => {
                this.http.get<VertexTO>(record.links.vertex).subscribe(vertex => {
                    this.source = vertex;
                    this.relationshipForm.get(RelationshipFormAttributes.SOURCE).setValue(vertex.id);
                });
            });

        this.targetVertexFormControl.valueChanges
            .pipe(filter(value => value !== null))
            .subscribe((record: SearchPersonRecord | SearchCompanyRecord) => {
                this.http.get<VertexTO>(record.links.vertex).subscribe(vertex => {
                    this.target = vertex;
                    this.relationshipForm.get(RelationshipFormAttributes.TARGET).setValue(vertex.id);
                });
            });
    }

    reset() {
        this.searchInputs.forEach(searchInput => searchInput.reset());
    }
}
