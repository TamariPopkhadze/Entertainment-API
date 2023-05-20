import mongoose from 'mongoose'

const { Schema , model } = mongoose

const passwordRecovery = new Schema({
    hash: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
})

const PasswordRecovery = model('PasswordRecovery', passwordRecovery)

export default PasswordRecovery