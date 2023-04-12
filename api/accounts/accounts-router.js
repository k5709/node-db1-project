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
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      //later
      const newAccount = await Account.create(req.body);

      return res.status(201).json(newAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  middleware.checkAccountId,
  middleware.checkAccountPayload,
  async (req, res, next) => {
    try {
      // console.log(req);
      const account = req.body;
      const updatedAccount = await Account.updateById(req.params.id, account);
      return res.status(200).json(updatedAccount);
    } catch (err) {
      console.log(err.messasge);
      next(err.message);
    }
  }
);

router.delete("/:id", middleware.checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account);
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
