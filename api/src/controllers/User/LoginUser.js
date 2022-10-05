const bcrypt = require("bcryptjs");
const { User } = require("../../db.js");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: {email : email } });
    if (!user) {
      throw new Error("usuario inavlido");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new Error("contraseña invalida");
    }
     return res.status(200).send("Welcome")
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

module.exports ={
    loginUser
}
