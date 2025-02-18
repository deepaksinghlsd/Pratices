const User = require("../Schema/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.SignUp = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    const validatePhonenumber = (phone) => {
      const regex = /^[0-9]{10}$/;
      return regex.test(phone);
    };
    if (!validatePhonenumber(phone)) {
      return res.status(400).json({
        message: "Invalid phone number . It must be exactly 10 digits.",
        success: false,
      });
    }
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (existingUser) {
      const conflictField =
        existingUser.email === email ? "Email" : "Phone Number";
      return res.status(401).json({
        message: `${conflictField} already exiats`,
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    const savedUser = await user.save();
    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: savedUser,
    });
  } catch (error) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "user cant not signup please try again",
      error: e,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    let user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({
        message: "Invalid phone number",
        success: false,
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });
    }
    const Token = user.id;
    const payload = {
      user: user.id,
    };
    const token = jwt.sign(payload, process.env.Jwt_Secret, {
      expiresIn: "1h",
    });
    user = {
        id: user.id,
        name: user.name,
        token : token

    }
    console.log(user);
    
    return res.status(200).cookie("token", token ,{ maxAge: 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
        message: "User logged in successfully",
        success: true,
        user

    })
  } catch (error) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "user cant not login please try again",
    });
  }
};

exports.logOut =async (req , res) =>{
    try {
       return res.status(200).cookie("token", "" ,{maxAge:0}).json({
        message: "User logged out successfully",
        success: true
       })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while logging out",
            });
    }
}
