const { Schema } = require('mongoose');
const schema = Schema;

const personSchema = new schema({
   name: String,
   age: Number,
   hobby: String
});

module.exports = { personSchema };