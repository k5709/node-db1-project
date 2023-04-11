const router = require("express").Router();
const middleware = require("./accounts-middleware");
const Account = require("./accounts-model");

router.get("/", async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (err) {
    next({ status: 422, message: "this is horrible" });
  }
});

router.get("/:id", middleware.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accountId = await Account.getById(req.params.id);
    if (!accountId) {
      res.status(404).json({ message: "account not found" });
    } else {
      res.json(accountId);
    }
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  middleware.checkAccountPayload,
  middleware.checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
    try {
      res.json("post accounts");
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  middleware.checkAccountId,
  middleware.checkAccountPayload,
  (req, res, next) => {
    // DO YOUR MAGIC
    try {
      res.json("update account");
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", middleware.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json("delete account");
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = router;
