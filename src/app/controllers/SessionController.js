import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    // getting the user credentials to verify its authenticity below
    const { email, password } = req.body;

    // try to find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        error: `User not found`,
      });
    }

    // comparing the password with its hash
    const isPasswordValid = await user.checkPassword(password); // either true or false
    if (!isPasswordValid) {
      return res.status(401).json({
        error: `Password does not match`,
      });
    }

    // it verification goes right, create session token and also destruct some user info
    const { id, name } = user;
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token,
    });
  }

  // df1ae6885734758712e86808dae636d8
}

export default new SessionController();
