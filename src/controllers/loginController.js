import loginServices from "../services/loginServices";

let getPageLogin = (req, res) => {
  return res.render("login.ejs", { data: "" });
};

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let permission = await loginServices.handlePermissions(email, password);

  if (permission === true) {
    return res.redirect("/admin");
  }
  if (permission === false) {
    return res.redirect("/");
  } else {
    return res.render("login.ejs", { data: permission });
  }
};

let handleRegist = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  await loginServices.handleCreateAcc(email, password);

  return res.redirect("/login");
};

module.exports = {
  getPageLogin: getPageLogin,
  handleLogin: handleLogin,
  handleRegist: handleRegist,
};
