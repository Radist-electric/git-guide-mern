const { Schema, model } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickName: {type: String, required: true},
  firstName: {type: String, required: false},
  lastName: {type: String, required: false},
  date: { type: Date, default: Date.now }
})

module.exports = model('User', schema)