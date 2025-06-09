import User from '../user/user.model.js'
import { encrypt, checkPassword } from '../../utils/encrypt.js'

//Actualizar Usuario

export const updateUser = async (req, res) => {
    try {
        const {
            name,
            surname,
            phone,
            address,
            email
        } = req.body

        const idC = req.user.uid

        const update = await User.findByIdAndUpdate(
            idC,
            {name,
            surname,
            phone,
            address,
            email},
            { new: true }
        )

        return res.send(
            {
                success: true,
                message: 'User updated successfully',
                user: {name, surname, phone, address, email}
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal server error',
                error
            }
        )
    }
}

//Update Password
export const updatePassword = async (req, res) => {
    try {

        let id = req.user.uid

        let { oldPassword, newPassword } = req.body

        let user = await User.findById(id)

        if (user && await checkPassword(user.password, oldPassword)) {
            user.password = await encrypt(newPassword)
            user.save()
            return res.send(
                {
                    success: true,
                    message: 'Updated Password Successfully'
                }
            )
        }

        return res.send(
            {
                success: false,
                message: 'Incorrect Password'
            }
        )

    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error'
            }
        )
    }
}

//Delete User
export const deleteUser = async (req, res) => {
    try {
        let idC = req.user.uid 
        let password = req.body.password 

        let userC = await User.findById(idC) 
        if (!userC) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            }) 
        }

        if (await checkPassword(userC.password, password)) {
            await User.findByIdAndDelete(idC)  
            return res.send({
                success: true,
                message: 'User deleted successfully'
            })

        } else {
            return res.status(401).send({
                success: false,
                message: 'Incorrect password'
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'General error'
        })
    }
}




/* =========================================================================================================*/
/* ==========================INITUSER========================================= */
/* =========================================================================================================*/

//Perfil al Iniciar base de datos
const initUser = async () => {
    try {
        const adminExist = await User.findOne({ role: 'ADMINPLATAFORM' })

        if (!adminExist) {
            const password = await encrypt('Alfred@88917', 10)

            const userAdmin = new User({
                name: 'Rene',
                surname: 'López',
                username: 'rlopez',
                email: 'rlopez@gmail.com',
                address: 'Sector 2 Manzana H casa 5',
                password: password,
                phone: '47491420',
                role: 'ADMINPLATAFORM',
                profilePhoto: '../images/profileImages/Avatar-Default.jpg',
                personalData: 
                    {
                        cui: '3001058960101',
                        nit: '22334561'
                    }
                
            })

            await userAdmin.save()
            console.log('Admin created')
        } else {
            console.log('Admin already exists')
        }
    } catch (error) {
        console.error('Error, not Admin created', error)
    }
}

//Llamar a la función initUser
initUser()