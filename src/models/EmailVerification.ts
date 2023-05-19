import mongoose from 'mongoose'

const { Schema , model } = mongoose

const emailVerificationSchema = new Schema({
    hash: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    }
})

const EmailVerification = model('EmailVerification', emailVerificationSchema)

export default EmailVerification