import jwt from 'jsonwebtoken';

export const generateAccessToken = (user)=>{
    return jwt.sign({
        id:user.id,
        email:user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
)
}

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.REFRESH_SECRET,
    { expiresIn: '1d' }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_SECRET);
};
