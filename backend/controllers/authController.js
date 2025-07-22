const User = require ('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create ({name, email, password: hashedPassword}); 
        res.status(201).json({user});
    }
    catch(error){
        console.error('error al registrar', error);
        res.status(400).json({error: 'error al registrar'});
    }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(401).json({ message: 'El usuario no existe' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ message: 'error al autenticar' });
  }
};
