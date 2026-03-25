export const ValidateReview = async (schemas) => {
  return async (req, res, next) => {
    const { value, error } = await schemas.validate(req.body);
    if (error) {
      res.json("Invalid ID");
    } else {
      next();
    }
  };
};
