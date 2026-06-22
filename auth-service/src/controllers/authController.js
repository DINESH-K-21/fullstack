
import { login, register } from '../services/authService.js';
import { generateAccessToken, verifyRefreshToken } from '../utils/jwt.js';

export const registerController = async (req, res) => {
  console.log(req.body);
  
  try {
    const { name , email, password } = req.body;

    const { user, accessToken, refreshToken } = await register(name , email, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.json({
      message: 'User registered successfully',
      user: { id: user.id, email: user.email },
      accessToken
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await login(email, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email },
      accessToken
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token' });
    }


    const user = verifyRefreshToken(refreshToken);


    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};
