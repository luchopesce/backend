let users = [
  {
    id: 1,
    name: "John",
    lastname: "Doe",
  },
];

export const getAll = () => {
  return users;
};

export const create = (user) => {
  users.push(user);
  return user;
};
