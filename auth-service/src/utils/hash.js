import bcrypt from "bcrypt";

export const hashPassword = (password) =>{
    const salt = bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

export const comparePassword = (password,hash) =>{
    return bcrypt.compare(password, hash);
}
