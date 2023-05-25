let category = [
    {
        id: 1,
        name: "Action Figures"
    }, 
    {
        id: 2,
        name: "Dolls"
    }
]

class CategoryManager {
    constructor() {
        this.category = category;
    }

    getAll() {
        return this.category;
    }   

    create(category) {
        this.category.push(category);
        return category;
    }
}

export {CategoryManager};