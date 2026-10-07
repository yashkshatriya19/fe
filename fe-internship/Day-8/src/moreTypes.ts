type book={
    name:string
}
let bookString='{"name": "Harry Potter"}'
let boojObj=JSON.parse(bookString) as book;
console.log(boojObj.name);
