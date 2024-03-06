const bcrypt = require('bcryptjs');

const encryptPass = async (req, res, next) => {
  try {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    next();
  } catch (err) {
    next(err);
  }
};

async function comparePass(candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword);
}

// const comparePass = async (candidatePassword, userPassword)
// => await bcrypt.compare(candidatePassword, userPassword);

module.exports = {
  encryptPass,
  comparePass,
};
