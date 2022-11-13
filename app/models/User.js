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
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password
  }
})

const User = model('User', userSchema)

const find = async (username) => {
  return await User.findOne(username)
}

const create = async (newUserData) => {
  const newUser = new User(newUserData)

  const user = await newUser.save()
  return user
}

module.exports = { find, create }
