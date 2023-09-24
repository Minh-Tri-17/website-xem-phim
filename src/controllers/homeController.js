import homeService from "../services/homeService";
import headerService from "../services/headerService";
import detailService from "../services/detailService";

let getPageHome = async (req, res) => {
  let dataMovie = await homeService.handleLoad10Movie();
  let dataCartoon = await homeService.handleLoad10Cartoon();
  let dataSeries = await homeService.handleLoad10Series();
  let dataSlide = await homeService.handleLoadMovieSlide();
  let dataTopSlide = await homeService.handleLoadTopSlide();
  let dataTop1 = await homeService.handleLoadTop1Movie();

  let dataGenre = await headerService.handleLoadGenre();
  let dataCatalog = await headerService.handleLoadCatalog();
  return res.render("home.ejs", {
    dataMovie,
    dataCartoon,
    dataSeries,
    dataSlide,
    dataTopSlide,
    dataGenre,
    dataCatalog,
    dataTop1,
  });
};

let handleDetailMovie = async (req, res) => {
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

  console.log(dataInfoMovie);

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

module.exports = {
  getPageHome: getPageHome,
  handleDetailMovie: handleDetailMovie,
};
