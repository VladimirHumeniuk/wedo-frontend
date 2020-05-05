import gql from 'graphql-tag';
import { categoryFieldsFragment } from './common/api.fragments';

// Api;
export const getAllCategoriesQuery = gql`
    query {
        getAllCategories {
            ...categoryFields
        }
    }
    ${categoryFieldsFragment}
`;

export const getCategoryQuery = gql`
    query getCategory($id: Int!) {
        getCategory(id: $id) {
            ...categoryFields
        }
    }
    ${categoryFieldsFragment}
`;

// Mutation
export const addCategoryMutation = gql`
    mutation addCategory($category: CategoryInput!) {
        addCategory(category: $category)
    }
`;

export const removeCategoryMutation = gql`
    mutation removeCategory($id: Int!) {
        removeCategory(id: $id)
    }
`;