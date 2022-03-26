import { ObjectId } from 'mongoose'


export class CreateCommentkDto {
    readonly username: string
    readonly text: string
    readonly trackId: ObjectId
}