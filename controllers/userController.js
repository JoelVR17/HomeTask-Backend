import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";

const register = async (req, res) => {
  // Avoid duplicate records
  const { email } = req.body;
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    const error = new Error("The user already registered");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generateId();

    const userStored = await user.save();

    res.json(userStored);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // User exist
  if (!user) {
    const error = new Error("The user not exist");

    return res.status(404).json({ msg: error.message });
  }

  // User confirmed
  if (!user.confirmed) {
    const error = new Error("Your account has not been confirmed");

    return res.status(403).json({ msg: error.message });
  }

  // Validate password
  if (await user.verifyPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("Incorrect password");
    return res.status(403).json({ msg: error.message });
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;

  const userConfirm = await User.findOne({ token });

  if (!userConfirm) {
    const error = new Error("Invalid Token");

    return res.status(403).json({ msg: error.message });
  }

  try {
    userConfirm.confirmed = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({ msg: "User Confirmed" });
  } catch (error) {
    console.log(error);
  }
};

const forwardPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // User exist
  if (!user) {
    const error = new Error("The user not exist");

    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = generateJWT(user._id);
    await user.save();
    res.json({ msg: "Check your email for reset your password" });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;

  const tokenValid = await User.findOne({ token });

  if (tokenValid) {
    res.json({ msg: "Valid token and the user exist" });
  } else {
    const error = new Error("Invalid Token");

    return res.status(403).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;

  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = "";

    try {
      await user.save();

      res.json({ msg: "The password has been changed" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Invalid Token");

    return res.status(403).json({ msg: error.message });
  }
};

const profile = async (req, res) => {
  const { user } = req;

  res.json(user);
};

export {
  register,
  login,
  confirm,
  forwardPassword,
  checkToken,
  newPassword,
  profile,
};
