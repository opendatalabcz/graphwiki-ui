import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentsComponent} from './components/comments/comments.component';
import {MatButtonModule, MatIconModule, MatTreeModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '@core/core.module';
import {MomentModule} from 'ngx-moment';
import {CommentItemComponent} from './components/comment-item/comment-item.component';
import {CommentInputComponent} from './components/comment-input/comment-input.component';
import {LayoutModule} from '@layout/layout.module';

const matModules = [
    MatTreeModule,
    MatButtonModule,
    MatIconModule
];

const exports = [
    CommentsComponent
];

@NgModule({
    declarations: [
        ...exports,
        CommentItemComponent,
        CommentInputComponent,
    ],
    exports: [
        ...exports
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        CoreModule,
        LayoutModule,

        ...matModules,

        MomentModule,
    ]
})
export class CommentModule {
}
