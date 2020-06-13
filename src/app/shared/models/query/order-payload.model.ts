type OrderByDirection = 'desc' | 'asc';
export class OrderPayloadInput {
    direction: OrderByDirection;
    fieldName: string;
    selectedRaw?: string;

    constructor(elements?: Partial<OrderPayloadInput>) {
        Object.assign(this, elements);
    }

    static getOrderRequest(order: OrderPayloadInput): OrderPayloadInput {
        if(!order) {
            return;
        }

        const {
            direction,
            fieldName
         } = order;

        return new OrderPayloadInput({
            direction,
            fieldName
        });
    }
}