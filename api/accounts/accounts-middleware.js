const Account = require("./accounts-model");
const db = require("../../data/db-config");

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
      if (isNaN(parsedBudget)) {
        res.status(400).json({ message: "budget of account must be a number" });
      } else if (parsedBudget < 0 || parsedBudget > 1000000) {
        res
          .status(400)
          .json({ message: "budget of account is too large or too small" });
      } else {
        next();
      }
    }
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db("accounts")
      .where("name", req.body.name.trim())
      .first();

    if (existing) {
      next({ status: 400, message: "that name is taken" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
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
