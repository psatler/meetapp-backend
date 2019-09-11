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
    console.log(req.userId);
    return res.json({
      ok: true,
    });
  }
}

export default new UserController();
