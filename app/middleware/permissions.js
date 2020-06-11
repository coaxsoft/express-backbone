const isAllowed = (requestedRoles, userRoles) => {
  let requestedRolesArr = [];

  if (!Array.isArray(requestedRoles)) {
    requestedRolesArr.push(requestedRoles)
  } else {
    requestedRolesArr = [...requestedRoles];
  }

  return userRoles.some(role => {
    return (requestedRolesArr.includes(role.id) || requestedRolesArr.includes(role.roleName))
  });
};

function allow(roles) {
  return (req, res, next) => {
    if (isAllowed(roles, req.user.Roles)) {
      return next();
    }

    next({ status: 403 });
  };
}

function deny(roles) {
  return (req, res, next) => {

    if (!isAllowed(roles, req.user.Roles)) {
      return next();
    }

    next({ status: 403 });
  };
}

module.exports = {
  allow,
  deny
};