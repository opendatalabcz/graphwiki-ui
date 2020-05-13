import {NgModule} from '@angular/core';
import {HeaderComponent} from '@core/components/header/header.component';
import {RouterModule} from '@angular/router';
import {AddressPipe} from '@core/pipes/address.pipe';
import {CommonModule} from '@angular/common';
import {AcronymPipe} from '@core/pipes/acronym.pipe';
import {AcronymIconComponent} from '@core/components/acronym-icon/acronym-icon.component';
import {UsernamePipe} from '@core/pipes/username.pipe';
import {UserInfoComponent} from '@core/components/user-info/user-info.component';
import {LabelValueComponent} from '@core/components/label-value/label-value.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from '@core/components/form-controls/input/input.component';
import {TextareaComponent} from './components/form-controls/textarea/textarea.component';
import {SelectComponent} from './components/form-controls/select/select.component';
import {LabelBadgeComponent} from './components/label-badge/label-badge.component';
import {MomentModule} from 'ngx-moment';
import {GraphEntityStateBadgePipe} from '@core/pipes/graph-entity-state-badge.pipe';
import {GenderSalutationPipe} from '@core/pipes/gender-salutation.pipe';
import {ValidatorMessagePipe} from '@core/pipes/validator-message.pipe';
import {AutocompleteComponent} from './components/form-controls/autocomplete/autocomplete.component';
import {DatePickerComponent} from '@core/components/form-controls/date-picker/date-picker.component';
import {
    MAT_DIALOG_DEFAULT_OPTIONS,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatTooltipModule
} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {TaskService} from '@task/service/task.service';
import {ServerErrorComponent} from './components/server-error/server-error.component';
import {LayoutModule} from '@layout/layout.module';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {AboutComponent} from './components/about/about.component';

const matModules = [
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
];

const exports = [
    HeaderComponent,
    UserInfoComponent,
    LabelBadgeComponent,
    LabelValueComponent,
    AcronymIconComponent,
    AddressPipe,
    UsernamePipe,
    GenderSalutationPipe,
    GraphEntityStateBadgePipe,
    AcronymPipe
];

const formControls = [
    InputComponent,
    TextareaComponent,
    AutocompleteComponent,
    SelectComponent,
    DatePickerComponent,
];

@NgModule({
    declarations: [
        ValidatorMessagePipe,
        ...exports,
        ...formControls,
        ServerErrorComponent,
        NotFoundComponent,
        UnauthorizedComponent,
        ConfirmDialogComponent,
        AboutComponent
    ],
    exports: [
        ...exports,
        ...formControls
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,

        LayoutModule,

        ...matModules,

        MomentModule,
    ],
    providers: [
        TaskService,
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
    ],
    entryComponents: [
        ConfirmDialogComponent
    ]
})
export class CoreModule {
}
