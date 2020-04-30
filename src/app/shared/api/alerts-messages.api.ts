import gql from 'graphql-tag';
import { alertFieldsFragment, alertDataFieldsFragment } from './common/api.fragments';

// Api;
export const getAllAlertsQuery = gql`
    query {
        getAllAlerts {
            ...alertDataFields
        }
    }
    ${alertDataFieldsFragment}
`;

export const getAlertsQuery = gql`
    query getAlerts($uid: String!){
        getAlerts(uid: $uid) {
            ...alertFields
        }
    }
    ${alertFieldsFragment}
`;


// Mutation
export const addAlertMutation = gql`
    mutation addAlert($uid: String!, $alert: AlertInput!) {
      addAlert(uid: $uid, alert: $alert)
    }
`;

export const removeAlertMutation = gql`
    mutation removeAlert($code: String!, $uid: String!) {
      removeAlert(code: $code, uid: $uid)
    }
`;



