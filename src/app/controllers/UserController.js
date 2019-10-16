import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // create the schema to be used to validate the req.body
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // if is not valid, go inside if-statement
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation has failed' });
    }

    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({
        error: 'User already exists',
      });
    }

    // filtering only those fields considered necessaries from the user for the frontend
    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  // route protected by middleware
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6), // this is an optional field when updating
      // but if it exists, password must be inserted as well
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          // make it required if oldPassword present
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // if is not valid, go inside if-statement
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation has failed' });
    }

    // get some values to perform validations
    const { email, oldPassword } = req.body;
    // get the user which is wanting to be edited in the database
    const user = await User.findByPk(req.userId);

    // if user is wanting to change email
    if (email && email !== user.email) {
      // tries to find another user with the email that the user has typed
      const userExists = await User.findOne({ where: { email } });

      // if found
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    // if user is wanting to change password
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      // if oldPassword is wrong
      return res.status(401).json({ error: `Password does not match` });
    }

    // if everything passes, we update the user
    const { id, name, email: userEmail } = await user.update(req.body);

    return res.json({
      id,
      name,
      email: userEmail,
    });
  }
}

export default new UserController();
