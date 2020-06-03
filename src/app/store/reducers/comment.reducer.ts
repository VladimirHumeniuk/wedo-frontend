import { Comment } from '../../shared/models';
import * as CommentActions from '../actions/comment.action';
import { CommentState } from 'src/app/store/states/comment.state';

const getUpdatedItems = (state: CommentState, commentToUpdate: Comment) => {
    const companyComments = state.companyComments;
    const index = companyComments.findIndex(comment => comment.id === commentToUpdate.id)
    const toUpdate = [...companyComments.slice(0, index), {
           ...commentToUpdate
        },
        ...companyComments.slice(index + 1),
    ];
    return toUpdate;
}

export function commentReducer(
  state: CommentState = new CommentState(),
  action: CommentActions.Actions
): CommentState {
  switch (action.type) {
    case CommentActions.ADD_COMPANY_COMMENT: {
      return { ...state, loading: true, error: null };
    }

    case CommentActions.ADD_COMPANY_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        companyComments: [...state.companyComments, action.payload.comment]
      };
    }

    case CommentActions.ADD_COMPANY_COMMENT_ERROR: {
      return {
        ...state,
        loading: false,
        error: 'Comment is not added'
      };
    }

    case CommentActions.UPDATE_COMPANY_COMMENT: {
      const roollbackItem = state.companyComments.find(comment => comment.id === action.payload.comment.id)
      return {
          ...state,
          loading: true,
          error: null,
          companyComments: getUpdatedItems(state, action.payload.comment),
          rollback: roollbackItem
        };
    }

    case CommentActions.UPDATE_COMPANY_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null
      };
    }

    case CommentActions.UPDATE_COMPANY_COMMENT_ERROR: {
      return {
        ...state,
        loading: false,
        error: 'Comment is not added',
        companyComments: getUpdatedItems(state, state.rollback),
        rollback: null
      };
    }

    case CommentActions.REMOVE_COMPANY_COMMENT: {
      return { ...state, loading: true, error: null };
    }

    case CommentActions.REMOVE_COMPANY_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        companyComments: [
          ...state.companyComments.filter(
            x => x.id !== action.payload.commentId
          )
        ]
      };
    }

    case CommentActions.REMOVE_COMPANY_COMMENT_ERROR: {
      return {
        ...state,
        loading: false,
        error: 'Comment is not removed'
      };
    }

    case CommentActions.GET_ALL_COMPANY_COMMENTS: {
      return { ...state, loading: true, error: null };
    }

    case CommentActions.GET_ALL_COMPANY_COMMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        companyComments: [...action.payload.comments]
      };
    }

    case CommentActions.GET_ALL_COMPANY_COMMENTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: 'All Comments are not fetched'
      };
    }

    case CommentActions.APPLY_ORDER_TO_COMPANY_COMMENTS: {
        return {
          ...state,
          query: {...state.query, order: {...action.payload.query.order }}
        };
      }

    default:
      return state;
  }
}
