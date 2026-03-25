export const ValidateUser = (schemas) => {
  return (req, res, next) => {
    const { value, error } = schemas.validate(req.body);
    if (error) {
      res.json({
        Message: "Invalid Input",
        error: error,
      });
    } else {
      next();
    }
  };
};

export const ValidateLogin = (schemas) => {
  return (req, res, next) => {
    const { value, error } = schemas.validate(req.body);
    if (error) {
      res.json({
        Message: "Invalid Input",
        error: error,
      });
    } else {
      next();
    }
  };
};

export const ValidateUpdate = (schemas) => {
  return (req, res, next) => {
    const { value, error } = schemas.validate(req.body);
    if (error) {
      res.json({
        Message: "Invalid Input",
        error: error,
      });
    } else {
      next();
    }
  };
};
