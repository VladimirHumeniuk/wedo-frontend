import gql from 'graphql-tag';
import { categoryFieldsFragment, popularFieldsFragment } from './common/api.fragments';

// API
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

export const getPopularQuery = gql`
    query {
        getPopular {
            ...popularFields
        }
    }
    ${popularFieldsFragment}
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
