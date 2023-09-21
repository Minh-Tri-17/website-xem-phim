import headerService from "../services/headerService";
import detailService from "../services/detailService";

let getPageDetail = async (req, res) => {
  let dataGenre = await headerService.handleLoadGenre();
  let dataCatalog = await headerService.handleLoadCatalog();

  return res.render("detail.ejs", { dataGenre, dataCatalog });
};

let handleComment = async (req, res) => {
  let comment = req.query.comment;
  let score = req.query.score;
  let idPhim = req.query.id;
  await detailService.handleCreateComment(idPhim, comment, score);
  return res.redirect("/");
};

module.exports = {
  getPageDetail: getPageDetail,
  handleComment: handleComment,
};
