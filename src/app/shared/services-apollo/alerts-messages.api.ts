import gql from 'graphql-tag';
import { alertFieldsFragment } from './common/api.fragments';

// Api;
export const getAllAlertsQuery = gql`
    query {
        getAllAlerts {
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



