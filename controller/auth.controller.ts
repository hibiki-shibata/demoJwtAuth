import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { users } from '../models/models';
import { generateToken } from '../utils/generateToken';
import { v4 as uuid } from 'uuid';

import customException from '../exceptions/customeException';


export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const register = async (req: Request, res: Response, next: Function) => {
  try {
    const { username, password } = req.body;

    const userExists = users.find((u) => u.username === username);
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: uuid(), username, password: hashedPassword };
    users.push(user);

    res.status(201).json({
      id: user.id,
      username: user.username,
      token: generateToken(user.id),
    });


  } catch (error) {
    next(new customException('Registration failed'))
  }
};


export const login = async (req: Request, res: Response, next: Function) => {
  try {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      id: user.id,
      username: user.username,
      token: generateToken(user.id),
    });


  } catch (error) {
    next(new customException('Login failed'));
  }

};



export const getProfile = async (req: AuthenticatedRequest, res: Response, next: Function) => {
  try {
    res.json({ message: `Welcome, user ${req.user?.id}` });
  } catch (error) {
    next(new customException('Failed to retrieve profile'));
  }
};


