import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true, select: false }) // Add select: false
    password: string; // Add password field

    @Prop({ required: true })
    age: number;

    @Prop({ required: false, default: false })
    isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);