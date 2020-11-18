const { Schema, model } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickName: {type: String, required: false},
  firstName: {type: String, required: false},
  lastName: {type: String, required: false},
  role: {type: String, required: false},
  date: { type: Date, default: Date.now }
})

module.exports = model('User', schema)