import User from '../models/User';

class UserController {
  async store(req, res) {
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
    // get some values to perform validations
    const { email, oldPassword } = req.body;
    // get the user which is wanting to be edited in the database
    const user = await User.findByPk(req.userId);

    // if user is wanting to change email
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

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
    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
