import { produce } from "immer";

const book = { title: "Technics" };

function publish(book) {
  return produce(book, (draftBook) => {
    draftBook.isPublished = true;
  });
}

const updated = publish(book);

console.log(book);
console.log(updated);
