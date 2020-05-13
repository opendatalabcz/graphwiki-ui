import {CommentTO} from '@graphwiki/comment-service-api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InputLengthConfig} from '@core/constants/input-length-config';

export enum CommentFormAttributes {
    TEXT = 'text',
}

export interface CommentTreeNode {
    expandable: boolean;
    comment: CommentTO;
    level: number;
    replyInputVisible: (visible: boolean) => void;
    _replyInputVisible: boolean;
    replyForm: FormGroup;
    updateInputVisible: (visible: boolean) => void;
    _updateInputVisible: boolean;
    updateForm: FormGroup;
}

export function createCommentTreeNode(comment: CommentTO, level: number, testFormControlName: string, fb: FormBuilder): CommentTreeNode {
    const node: CommentTreeNode = {
        expandable: comment.replies && comment.replies.length > 0,
        comment,
        level,
        replyInputVisible: () => {
            throw Error('Must be initialized!');
        },
        _replyInputVisible: false,
        updateInputVisible: () => {
            throw Error('Must be initialized!');
        },
        _updateInputVisible: false,
        replyForm: fb.group({
            [testFormControlName]: fb.control(null,
                [Validators.required, Validators.maxLength(InputLengthConfig.COMMENT)])
        }),
        updateForm: fb.group({
            [testFormControlName]: fb.control(comment.text,
                [Validators.required, Validators.maxLength(InputLengthConfig.COMMENT)])
        })
    };
    node.replyInputVisible = (visible) => {
        node.replyForm.reset();
        node._replyInputVisible = visible;
    };
    node.updateInputVisible = visible => {
        node.updateForm.get(CommentFormAttributes.TEXT).setValue(node.comment.text);
        node._updateInputVisible = visible;
    };
    return node;
}
