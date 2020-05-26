import { Comment} from 'src/app/shared/models';
import { AppState } from 'src/app/app.state';
import { createSelector } from '@ngrx/store';

export class CommentState {
    loading: boolean;
    error: string;
    rollback: Comment;
    companyComments: Comment[];

    constructor() {
        this.companyComments = [];
    }
}


export const selectCommentFeature = (state: AppState) => state.comment;
export const selectCommentFeatureComments = createSelector(selectCommentFeature, (state: CommentState) => state.companyComments);