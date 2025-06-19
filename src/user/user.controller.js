import User from '../user/user.model.js'
import { encrypt, checkPassword } from '../../utils/encrypt.js'
import path from 'path';
import fs from 'fs';
//Actualizar Usuario
export const updateUser = async (req, res) => {
    try {
        const idC = req.user.uid
        const user = await User.findById(idC)

        if (!user || !user.isActive) {
            return res.status(403).send({
                success: false,
                message: 'User is deactivated and cannot update profile'
            })
        }

        const { name, surname, phone, address, email } = req.body  || {}

        const updatedUser = await User.findByIdAndUpdate(
            idC,
            { name, surname, phone, address, email },
            { new: true }
        )

        return res.send({
            success: true,
            message: 'User updated successfully',
            user: updatedUser
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'Internal server error',
            error
        })
    }
}
export const listUserById = async (req, res) => {
  try {
    let { id } = req.params

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Could not find User'
      })
    }

    if (!user.isActive) {
      return res.status(403).send({
        success: false,
        message: 'This User is deactivated'
      })
    }

    return res.status(200).send({
      success: true,
      message: 'User Found',
      User: user
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'General Error',
      error
    })
  }
}

//Update Password
export const updatePassword = async (req, res) => {
    try {
        const idC = req.user.uid;
        const user = await User.findById(idC);

        let id = req.user.uid

        let { oldPassword, newPassword } = req.body

        if (oldPassword === newPassword) {
            return res.status(400).send({
                success: false,
                message: 'New password cannot be the same as the old password'
            });
        }

         if (!user || !user.isActive) {
            return res.status(403).send({
                success: false,
                message: 'User is deactivated and cannot update profile'
            });
        }
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

//Soft delete 
export const softDeleteUser  = async (req, res) => {
    try {
        let idC = req.user.uid
        let { password, deactivationReason } = req.body

        let userC = await User.findById(idC);

        if (!userC) {
            return res.status(404).send({
                success: false,
                message: 'User  not found'
            });
        }

        const isPasswordValid = await checkPassword(userC.password, password);
        if (isPasswordValid) {
            userC.isActive = false;
            userC.deactivationReason = deactivationReason || 'No reason provided'
            userC.deactivatedAt = new Date()
            await userC.save();

            return res.send({
                success: true,
                message: 'User  soft deleted successfully'
            })
        } else {
            return res.status(401).send({
                success: false,
                message: 'Incorrect password'
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'General error'
        })
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find()
        
        return res.send({
            success: true,
            message: 'Users retrieved successfully',
            users
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'General error ',
            error
        });
    }
}

export const getAllActiveUsers = async (req, res) => {
    try {
        const users = await User.find({ isActive: true });

        return res.send({
            success: true,
            message: 'Active users retrieved successfully',
            users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error retrieving active users',
            error: error.message
        });
    }
};

export const updateUserLogo = async (req, res) => {
  try {
    const userId = req.user.uid;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!userData.isActive) {
      return res.status(403).json({
        success: false,
        message: 'This user is deactivated and cannot update logo'
      });
    }

    if (userData.profilePhoto) {
      const uploadsDir = path.join(process.cwd(), 'uploads'); 
      const oldPath = path.join(uploadsDir, userData.profilePhoto);
      try {
        await fs.promises.unlink(oldPath);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          console.error('Error deleting old logo:', err);
        }
      }
    }

    // Actualizar nuevo logo
    userData.profilePhoto = req.file.filename;
    await userData.save();

    return res.json({
      success: true,
      message: 'User logo updated successfully'
    });

  } catch (error) {
    console.error('Update logo error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
 


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