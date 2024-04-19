import jwt from "jsonwebtoken";

export const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  
  return token;
};

export const createPasswordToken = (userId) =>{
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn:"5m"
  })

  return token
}
