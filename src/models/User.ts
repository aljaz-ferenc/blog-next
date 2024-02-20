import { Document } from "mongodb";
import {Schema, model, models} from 'mongoose'

export interface IUser extends Document{
    firstName: string
    lastName: string
    role: 'admin' | 'user'
    password: string
}

const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    password:{
        type: String,
    }
})

const User = models?.User || model('User', UserSchema)

export default User