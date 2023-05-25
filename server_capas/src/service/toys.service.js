import { getAll, create } from "../dao/toys.dao.js";

export const getAllToys = () => {
    return getAll();
}

export const createToy = (toy) => {   
    return create(toy);
}