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
  let idPhim = req.query.id;
  let idTheLoai = req.query.idTheLoai;

  let dataGenre = await headerService.handleLoadGenre();
  let dataCatalog = await headerService.handleLoadCatalog();

  let dataDetail = await homeService.handleLoadDetailMovie(idPhim);

  let dataRelate = await detailService.handleLoadRelate(idTheLoai);
  let dataTop10View = await detailService.handleLoadTop10View();
  let dataComment = await detailService.handleLoadComment(idPhim);
  let dataCountComment = await detailService.handleLoadCountComment(idPhim);
  let dataGenreMovie = await detailService.handleLoadGenreMovie(idPhim);
  let dataInfoMovie = await detailService.handleLoadInfoMovie(idPhim);
  await detailService.UpdateView(idPhim);

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
  });
};

module.exports = {
  getPageHome: getPageHome,
  handleDetailMovie: handleDetailMovie,
};
