const Account = require("./accounts-model");

exports.checkAccountPayload = async (req, res, next) => {
  try {
    const { name, budget } = req.body;
    if (!name || !budget) {
      res.status(400).json({ message: "name and budget are required" });
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log("checkAccountNameUnique fired");
  next();
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      res.status(404).json({ message: "not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
};
