const Account = require("./accounts-model");

exports.checkAccountPayload = async (req, res, next) => {
  const { name, budget } = req.body;

  if (!name || !budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else {
    const trimmedName = name.trim();
    if (trimmedName.length < 3 || trimmedName.length > 100) {
      res
        .status(400)
        .json({ message: "name of account must be between 3 and 100" });
    } else {
      const parsedBudget = Number(budget);
      if (Number.isNaN(parsedBudget)) {
        res.status(400).json({ message: "budget must be a number" });
      } else if (parsedBudget < 0 || parsedBudget > 1000000) {
        res
          .status(400)
          .json({ message: "budget must be between 0 and 1000000" });
      } else {
        next();
      }
    }
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
      res.status(404).json({ message: "account not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
};
