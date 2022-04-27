const errorResponse= require("../response/errorResponse")
module.exports = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json(new errorResponse(403, "Forbiden for user"));
    }

    next();
  };
};
