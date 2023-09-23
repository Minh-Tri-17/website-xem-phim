import loginServices from "../services/loginServices";

let getPageLogin = (req, res) => {
  return res.render("login.ejs", { data: "" });
};

let handleLogin = async (req, res) => {
  let dataReq = req.body;
  let permission = await loginServices.handlePermissions(dataReq);

  if (permission === true) {
    return res.redirect("/admin");
  }
  if (permission.id) {
    req.session.permission = permission.id;
    return res.redirect("/");
  } else {
    return res.render("login.ejs", { data: permission });
  }
};

let handleRegist = async (req, res) => {
  let dataReq = req.body;

  await loginServices.handleCreateAcc(dataReq);

  return res.redirect("/login");
};

module.exports = {
  getPageLogin: getPageLogin,
  handleLogin: handleLogin,
  handleRegist: handleRegist,
};
