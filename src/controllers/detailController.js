import headerService from "../services/headerService";
import detailService from "../services/detailService";
import homeService from "../services/homeService";

let getPageDetail = async (req, res) => {
  let dataReq = req.query;
  let permission = req.session.permission;

  let dataGenre = await headerService.handleLoadGenre();
  let dataCatalog = await headerService.handleLoadCatalog();

  let dataDetail = await homeService.handleLoadDetailMovie(dataReq);

  let dataRelate = await detailService.handleLoadRelate(dataReq);
  let dataTop10View = await detailService.handleLoadTop10View();
  let dataComment = await detailService.handleLoadComment(dataReq);
  let dataCountComment = await detailService.handleLoadCountComment(dataReq);
  let dataGenreMovie = await detailService.handleLoadGenreMovie(dataReq);
  let dataInfoMovie = await detailService.handleLoadInfoMovie(dataReq);
  await detailService.UpdateView(dataReq);

  return res.render("detail.ejs", {
    dataGenre,
    dataCatalog,
    dataDetail,
    dataRelate,
    dataTop10View,
    dataComment,
    dataGenreMovie,
    dataCountComment,
    dataInfoMovie,
    permission,
  });
};

let handleComment = async (req, res) => {
  let dataReq = req.query;
  if (dataReq.idTaiKhoan) {
    await detailService.handleCreateComment(dataReq);
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

module.exports = {
  getPageDetail: getPageDetail,
  handleComment: handleComment,
};
