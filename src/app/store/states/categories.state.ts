import { Category, Popular } from 'src/app/shared/models';

export class CategoriesState {
    public categories: Category[];
    public popular: Popular[];

    constructor() {
        this.categories = [];
        this.popular = [];
    }
}