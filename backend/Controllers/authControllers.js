import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      message: "New user registered",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async(req,res,next)=>{
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                message: "All fields required",
            })
        }
        const validUser = await User.findOne({email})
        if(!validUser){
            return res.status(404).json({
                message: "User not found",
            })
        }

        const isMatch = await bcrypt.compare(password, validUser.password );
        if(!isMatch) {
            return res.status(401).json({
                message: "Invalid Credentials",
            })
        }

        const token = jwt.sign({id: validUser._id},
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        )

        const { password: pass, ...rest } = validUser._doc;

        res.cookie("access_token", token,{
            httpOnly: true,
            sameSite:"strict",
        })
        .status(200).json({
            message:"Login successful",
            user: rest,
            
        })
    } catch (error) {
        next(error);
    }
}