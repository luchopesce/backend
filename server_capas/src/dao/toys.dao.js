let toys = [{
  id: 1,
  name: "Buzz Lightyear",
},
{
  id: 2,
  name: "Woody",
},
];

export const getAll = () => {
  return toys;
};

export const create = (toy) => {
  toys.push(toy);
  return toy
};
