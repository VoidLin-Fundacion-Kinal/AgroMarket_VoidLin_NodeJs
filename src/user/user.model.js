import {Schema, model} from 'mongoose'

const userSchema = new Schema(
    {
        //SobreNombre
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: [true, 'Username is already taken'], 
            lowercase: true,
            maxLength: [15, `Can't be overcome 15 characters`]
        },

        //Nombre
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },

        //Apellido
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },

        //Teléfono
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            minLength: [8, `Can't be overcome 8 characters`],
            maxLength: [15, 'Phone must be 15 numbers'],
        },

        //Dirección
        address: {
            type: String,
            required: [true, 'Address is required'],
            minLength: [5, `Can't be overcome 5 characters`],
            maxLength: [45, `Address must be 40 characters `]

        },

        //Correo
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email is already taken']
        },


        //Contraseña
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
            maxLength: [100, `Can't be overcome 100 characters`],
        },


        //Rol
        role: {
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['USUARIO','ADMINPLATAFORM']
        },

        profilePhoto: {
            type: String,
            default: 'Avatar-Default.jpg'
        },

        personalData:{
                cui:{
                    type: String,
                    required: true,
                    minLength: [13, `CUI must be 13 characters`],
                    maxLength: [13, `Can't be overcome 13 characters`]
                },

                nit:{
                    type: String,
                    required: true,
                    minLength: [5, `NIT must be 5 characters`],
                    maxLength: [10, `Can't be overcome 10 characters`]
                }
        },
        isActive: {
            type: Boolean,
            default: true
        },
        deactivationReason: {
            type: String,
            default: null
        },
        deactivatedAt: {
            type: Date,
            default: null
        }
    }
)

export default model('User', userSchema)