import { Request, Response } from 'express';
import Admin from '../../../models/admin';
import bcrypt from 'bcryptjs';
import { isValidEmail } from '../../../core/utils';
import { generate_token, IPayload } from '../../../helpers/jwt';

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await Admin.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (existingUser) {
      if (existingUser.email === email) {
        res.status(400).json({ error: 'Cannot use existing email' });
      }
      if (existingUser.username === username) {
        res.status(400).json({ error: 'Cannot use existing username' });
      }
    }
    if (!isValidEmail) {
      res.status(400).json({ error: 'Invalid email formate' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await Admin.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res
      .status(200)
      .json({ message: 'admin is created successfully', data: user });
  } catch (error) {
    res.status(500).json(error);
  }
};
