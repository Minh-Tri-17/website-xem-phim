import headerService from "../services/headerService";
import detailService from "../services/detailService";

let getPageDetail = async (req, res) => {
  let dataGenre = await headerService.handleLoadGenre();
  let dataCatalog = await headerService.handleLoadCatalog();

  return res.render("detail.ejs", { dataGenre, dataCatalog });
};

let handleComment = async (req, res) => {
  let dataReq = req.query;

  await detailService.handleCreateComment(dataReq);
  return res.redirect("/");
};

module.exports = {
  getPageDetail: getPageDetail,
  handleComment: handleComment,
};
