import { Category } from 'src/app/shared/models';

export class CategoriesState {
    public categories: Category[];

    constructor() {
        this.categories = [];
    }
}