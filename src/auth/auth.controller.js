import User from '../user/user.model.js'
import {encrypt, checkPassword} from '../../utils/encrypt.js'
import {generateJwt} from '../../utils/jwt.js'

export const register = async (req, res) => {
  try {
    const {
      username,
      name,
      surname,
      phone,
      address,
      email,
      password,
      cui,
      nit
    } = req.body;

    const user = new User({
      username,
      name,
      surname,
      phone,
      address,
      email,
      password: await encrypt(password),
      role: 'USUARIO',
      personalData: [
        {
          cui,
          nit
        }
      ]
    });

    await user.save();

    return res.send({
      message: `Registered successfully, can be logged with username: ${user.username}`
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: 'General error with user registration',
      error: error.message
    });
  }
};


export const login = async(req, res) => {
    try{
        let{userLogin, password} = req.body
        let user = await User.findOne(
            {
                $or:[
                    {email: userLogin},
                    {username: userLogin}
                ]
            }
        )
        
        if(!user) return res.status(404).send(
            {
                message: 'User not Found'
            }
        )

        if(user && await checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role,
                profilePhoto: user.profilePhoto
            }

            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send(
            {
                message: 'Invalid Credentials'
            }
        )
    }catch(error){
        return res.status(500).send(
            {
                message: 'General error with login'
            }
        )
    }
}



