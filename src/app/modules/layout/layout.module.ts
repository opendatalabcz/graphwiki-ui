import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {DefaultLayoutComponent} from './components/layout/default-layout/default-layout.component';
import {NavigationPanelLayoutComponent} from './components/layout/navigation-panel-layout/navigation-panel-layout.component';
import {NavigationPanelComponent} from './components/navigation-panel/navigation-panel.component';
import {RouterModule} from '@angular/router';
import {SectionComponent} from './components/section/section.component';
import {NoAvailableDataComponent} from './components/no-available-data/no-available-data.component';
import {MainSectionComponent} from './components/main-section/main-section.component';
import {ScrollSpyDirective} from './directives/scroll-spy.directive';
import {AnchorService} from '@layout/services/anchor.service';
import {ErrorComponent} from '@layout/components/error/error.component';
import {MatIconModule} from '@angular/material';

const matModules = [
    MatButtonModule,
    MatIconModule
];

const exports = [
    DefaultLayoutComponent,
    NavigationPanelLayoutComponent,
    SectionComponent,
    NoAvailableDataComponent,
    MainSectionComponent,
    ErrorComponent
];

@NgModule({
    declarations: [
        NavigationPanelComponent,
        ScrollSpyDirective,
        ...exports
    ],
    imports: [
        CommonModule,
        RouterModule,

        ...matModules
    ],
    exports: [
        ...exports
    ],
    providers: [
        AnchorService
    ]
})
export class LayoutModule {
}
