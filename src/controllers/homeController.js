import homeService from "../services/homeService";
import headerService from "../services/headerService";

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

module.exports = {
  getPageHome: getPageHome,
};
