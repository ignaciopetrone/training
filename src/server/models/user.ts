import mongoose from 'mongoose';
import { hash } from 'bcrypt'

// Is necessary to provide an interface to userSchema.pre<interface>() 
// in order to make mongoose work with typescript
interface InputUser extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  name: string;
}

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  name: String,
  password: String,
}, {
  timestamps: true
});

userSchema.pre<InputUser>('save', async function (next) {
  // A normal function is required here in order to access the user is being created through "this"
  // If we use an arrow function isntead, "this" is undefined.
  if(this.isModified('password')) {
    try {
      this.password = await hash(this.password, 10);
    } catch (err) {
      next(err);
    }
  }
  next()
})

export default mongoose.model('User', userSchema)