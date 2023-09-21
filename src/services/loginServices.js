import db from "../models/index";

let handlePermissions = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await checkLogin(email, password);
      if (data && data.Quyen === "admin") {
        resolve(true);
      }
      if (data && data.Quyen !== "admin") {
        resolve(false);
      }
      if (!data) {
        resolve("Tài Khoản không tồn tại hoặc sai mật khẩu");
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleCreateAcc = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      db.TaiKhoans.create({
        Email: email,
        MatKhau: password,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let checkLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.TaiKhoans.findOne({
        where: { Email: email, MatKhau: password },
        raw: true,
      });
      if (data) {
        resolve(data);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handlePermissions: handlePermissions,
  handleCreateAcc: handleCreateAcc,
};
