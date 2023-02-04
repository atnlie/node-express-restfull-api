const { Schema } = require('mongoose');
const schema = Schema;

const blogSchema = new schema({
    title: String,
    author: String,
    body: String
});

const personSchema = new schema({
   name: String,
   age: Number,
   hobby: String
});

module.exports = { personSchema, blogSchema };