module.exports = (...allowed) => {
  const isAllowed = role => {
    return allowed.includes(role) || allowed[0] === '*';
  };

  return (req, res, next) => {
    if (req.user.role && isAllowed(req.user.role.title)) {
      return next();
    }

    res.status(403).json({ message: 'Forbidden' });
  };
}
