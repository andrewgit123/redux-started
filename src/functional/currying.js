import { compose, pipe } from "lodash/fp";

const input = "  JavaScript  ";

const trim = (str) => str.trim();
const toUpperCase = (str) => str.toUpperCase();
const wrap = (tag) => (str) => `<${tag}>${str}</${tag}>`;

const transform = pipe(trim, toUpperCase, wrap("span"));

const result = transform(input);

console.log(result);
