import mongoose from 'mongoose';
import { hash, compare } from 'bcrypt'

// Is necessary to provide an interface to userSchema.pre<interface>() 
// in order to make mongoose work with typescript
export interface SignUpInput extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  name: string;
}
export interface SignInInput extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: (email: string) => User.checkIfAlreadyExist({email}),
      message: ({value}) => `Email ${value} has been already taken.`
      // TODO: Add security
    },
  },
  username: {
    type: String,
    validate: {
      validator: (username: string) => User.checkIfAlreadyExist({username}),
      message: ({value}) => `Username ${value} has been already taken.`
      // TODO: Add security
    },
  },
  name: String,
  password: String,
}, {
  timestamps: true
});

// Normal functions are required for accessing the user is being created through "this"
// If we use an arrow function instead, "this" is undefined
userSchema.pre<SignUpInput>('save', async function () {
  if(this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
});

// Add checkIfAlreadyExist attribute to User instance and use it as validator
userSchema.statics.checkIfAlreadyExist = async function(options: unknown) {
  return await this.where(options).countDocuments() === 0;
}

userSchema.methods.matchesPassword = function (incomingPassword: string) {
  return compare(incomingPassword, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;