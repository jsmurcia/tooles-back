import User from "../models/User.js";
import { registerEmail } from "../utils/email.js";
import { generateId } from "../utils/generateId.js";
import { generateJWT } from "../utils/generateJWT.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  //validate if the user exist
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  //validate if the user is confirmed
  if (!user.confirmed) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(404).json({ msg: error.message });
  }

  //check password
  if (await user.checkPassword(password)) {
    res.json({
      user,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("Credenciales incorrectas");
    return res.status(400).json({ msg: error.message });
  }
};

const register = async (req, res) => {
  const { email } = req.body;
  const existUser = await User.findOne({ email });

  if (existUser) {
    const error = new Error("El correo ya está registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generateId();
    await user.save();
    registerEmail(user);
    res.json({
      msg: "Uusario creado correctamente, revisa tu email para confirmar tu cuenta",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const confirmUser = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ token });

  if (!user) {
    const error = new Error("Token no válido");
    return res.status(400).json({ msg: error.message });
  }

  try {
    user.confirmed = true;
    user.token = "";
    await user.save();
    return res.json({ msg: "Usuario confirmado correctamente", user });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export { confirmUser, login, register };
