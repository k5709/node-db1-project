const db = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  //same thing as select * from accounts
  return db("accounts");
};

const getById = (id) => {
  // DO YOUR MAGIC
  //same thing as select * from accounts where id = 1
  return db("accounts").where("id", id).first();
};

const create = async (account) => {
  //same thing as insert into account (name, budget) values ('foo', 1000)
  const [id] = await db("accounts").insert(account);
  return getById(id);
};

const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  const updatedAccount = await db("accounts").where("id", id).first();
  return updatedAccount;
};

const deleteById = (id) => {
  //same thing as delete from account where id = 1;
  return db("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
