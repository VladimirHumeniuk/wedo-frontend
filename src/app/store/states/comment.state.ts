import { Comment} from 'src/app/shared/models';
import { AppState } from 'src/app/app.state';
import { createSelector } from '@ngrx/store';
import { QueryPayloadInput } from 'src/app/shared/models/query/query-payload.model';

export class CommentState {
    loading: boolean;
    error: string;
    rollback: Comment;
    companyComments: Comment[];
    query: QueryPayloadInput;

    constructor() {
        this.companyComments = [];
        this.query = new QueryPayloadInput();
    }
}


export const selectCommentFeature = (state: AppState) => state.comment;
export const selectCommentFeatureComments = createSelector(selectCommentFeature, (state: CommentState) => state.companyComments);
export const selectCommentFeatureQuery = createSelector(selectCommentFeature, (state: CommentState) => state.query);