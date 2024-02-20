import { Document } from "mongodb";
import {Schema, model, models} from 'mongoose'

export interface IPost extends Document{
    title: string
    description: string
    slug: string
    author: {
        firstName: string,
        lastName: string,
        _id: string
    }
    image: string
    publishedAt: Date
    body: string
    _id: string
}

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

const Post = models?.Post || model('Post', PostSchema)

export default Post