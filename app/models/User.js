const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  nombre: String,
  password: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  edad: Number,
  biografia: String,
  email: String,
  admin: Boolean
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password
    delete returnedObject.admin
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = model('User', userSchema)

const find = async (data) => {
  return await User.findOne(data)
}

const findById = async (id) => {
  return await User.findById(id)
}

const create = async (newUserData) => {
  const newUser = new User(newUserData)

  const user = await newUser.save()
  return user
}

const update = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true })
}

module.exports = { find, findById, create, update }
