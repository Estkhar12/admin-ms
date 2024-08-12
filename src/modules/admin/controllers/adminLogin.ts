import { Request, Response } from 'express';
import Admin, { IAdmin } from '../../../models/admin';
import { generate_token, IPayload } from '../../../helpers/jwt';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).json({ message: 'Enter your email and password!' });
    }
    const user: IAdmin | null = await Admin.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found!' });
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Invalid password!' });
      }
    }
    const payload = { _id: user?._id, role: user?.role };
    const token = generate_token(payload as IPayload);
    res.status(200).json({
      success: true,
      messgage: 'Login Successfully',
      token: token,
      data: user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
