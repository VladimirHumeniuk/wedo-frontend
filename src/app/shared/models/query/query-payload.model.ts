import { OrderPayloadInput } from 'src/app/shared/models/query/order-payload.model';

export class QueryPayloadInput {
    order?: OrderPayloadInput;

    constructor(elements?: Partial<QueryPayloadInput>) {
        Object.assign(this, elements);
    }

    static getQueryRequest(query: QueryPayloadInput) {
        if(!query) {
            return query;
        }

        const {
            order
         } = query;

        return new QueryPayloadInput({
            order: order && OrderPayloadInput.getOrderRequest(order) || undefined
        });
    }
}

