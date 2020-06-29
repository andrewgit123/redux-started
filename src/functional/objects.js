const person = {
  rank: "First",
  name: "Bob",
  address: { country: "Russia", city: "Rostov-on-Don" },
};
const updated = {
  ...person,
  name: "Andrey",
  address: {
    ...person.address,
    city: "Don",
  },
  age: 18,
};
updated.address.city = "Don";
updated.rank = "Two";

console.log(person);
console.log(updated);
