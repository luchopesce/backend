import { getAll } from "../dao/users.dao.js";

export const getAllUsers = () => {
    return getAll();
};
