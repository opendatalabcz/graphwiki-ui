import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentFormAttributes, CommentTreeNode} from '@comment/entities/comment.entities';
import {FormBuilder} from '@angular/forms';
import {CommentTO, CreateCommentTO} from '@graphwiki/comment-service-api';
import {HttpGenericService} from '@src/services/http-generic.service';

@Component({
    selector: 'app-comment-item',
    templateUrl: 'comment-item.component.html',
    styleUrls: ['comment-item.component.scss']
})
export class CommentItemComponent {

    @Input()
    commentTreeNode: CommentTreeNode;
    @Output()
    action = new EventEmitter<void>();

    CommentFormAttributes = CommentFormAttributes;

    constructor(private httpGenericService: HttpGenericService, private fb: FormBuilder) {
    }

    update(node: CommentTreeNode) {
        const updatedComment: CommentTO = {
            ...node.comment,
            ...node.updateForm.getRawValue()
        };
        this.httpGenericService.put(node.comment.links.update, updatedComment).subscribe(() => this.action.emit());
    }

    reply(node: CommentTreeNode) {
        const reply = node.replyForm.getRawValue() as CreateCommentTO;
        this.httpGenericService.post<CreateCommentTO>(node.comment.links.reply, reply).subscribe(() => {
            node.replyInputVisible(false);
            this.action.emit();
        });
    }

    delete(comment: CommentTO) {
        this.httpGenericService.delete(comment.links._delete).subscribe(() => this.action.emit());
    }
}
