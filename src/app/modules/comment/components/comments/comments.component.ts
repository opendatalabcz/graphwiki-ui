import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LinkTO} from '@core/entities/linkTO';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {InputLengthConfig} from '@core/constants/input-length-config';
import {CommentTO, CreateCommentTO} from '@graphwiki/comment-service-api';
import {CommentFormAttributes, CommentTreeNode, createCommentTreeNode} from '@comment/entities/comment.entities';
import {HttpGenericService} from '@src/services/http-generic.service';

@Component({
    selector: 'app-comments',
    templateUrl: 'comments.component.html',
    styleUrls: ['comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

    @Input()
    createLink: LinkTO;
    @Input()
    commentsLink: LinkTO;

    commentForm: FormGroup;
    CommentFormAttributes = CommentFormAttributes;
    commentInputVisible = false;
    treeControl: FlatTreeControl<CommentTreeNode>;
    dataSource: MatTreeFlatDataSource<CommentTO, CommentTreeNode>;
    private expansionThreshold = 1;
    readonly hasChild = (_: number, node: CommentTreeNode) => node.expandable;

    constructor(private httpGenericService: HttpGenericService, private fb: FormBuilder) {
        this.commentForm = fb.group({
            [CommentFormAttributes.TEXT]: fb.control(null, [Validators.required, Validators.maxLength(InputLengthConfig.COMMENT)])
        });
    }

    ngOnInit(): void {
        this.setupCommentsLayout();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.commentsLink) {
            this.loadComments(true);
        }
    }

    loadComments(initLoad = false) {
        this.httpGenericService.get<CommentTO[]>(this.commentsLink)
            .subscribe(comments => {
                if (initLoad) {
                    this.dataSource.data = comments;
                    this.treeControl.dataNodes.filter(node => node.level < this.expansionThreshold)
                        .forEach(node => this.treeControl.expand(node));
                } else {
                    const expandedNodeCommentIds = this.treeControl.dataNodes
                        .filter(node => this.treeControl.isExpanded(node) || node.level < this.expansionThreshold)
                        .map(node => node.comment.id);
                    this.dataSource.data = comments;
                    this.treeControl.dataNodes
                        .filter(node => expandedNodeCommentIds.includes(node.comment.id))
                        .forEach(node => this.treeControl.expand(node));
                }
            });
    }

    createComment() {
        const createComment = this.commentForm.getRawValue() as CreateCommentTO;
        this.httpGenericService.post<CreateCommentTO>(this.createLink, createComment).subscribe(() => {
            this.showHideCommentInput(false);
            this.loadComments();
        });
    }

    showHideCommentInput(visible: boolean) {
        this.commentForm.reset();
        this.commentInputVisible = visible;
    }

    private setupCommentsLayout() {
        this.treeControl = new FlatTreeControl<CommentTreeNode>(node => node.level, node => node.expandable);
        const treeFlattener = new MatTreeFlattener<CommentTO, CommentTreeNode>(
            this.transformer(), node => node.level, node => node.expandable, node => node.replies as CommentTO[]
        );
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, treeFlattener);
    }

    private transformer(): (comment: CommentTO, level: number) => CommentTreeNode {
        return (comment: CommentTO, level: number) => createCommentTreeNode(comment, level, CommentFormAttributes.TEXT, this.fb);
    }
}
