import moviesService from "../services/moviesService";
import headerService from "../services/headerService";

let getPageMovies = async (req, res) => {
  let idTheLoai = req.query.idTheLoai;
  let idDanhMuc = req.query.idDanhMuc;
  let inputSeach = req.query.inputSeach;
  let country = req.query.country;
  let year = req.query.year;
  let dataMovie;

  if (idTheLoai) {
    dataMovie = await moviesService.handleLoadMovieGenre(idTheLoai);
  }
  if (idDanhMuc) {
    dataMovie = await moviesService.handleLoadMovieCatalog(idDanhMuc);
  }
  if (inputSeach) {
    dataMovie = await moviesService.handleLoadSeachMovie(inputSeach);
  }
  if ((country, year)) {
    dataMovie = await moviesService.handleLoadFilterMovie(country, year);
  }
  if (!idTheLoai && !idDanhMuc && !inputSeach && !country && !year) {
    dataMovie = await moviesService.handleLoadAllMovie();
  }

  let dataGenre = await headerService.handleLoadGenre();
  let dataCatalog = await headerService.handleLoadCatalog();
  let dataYear = await moviesService.handleLoadYearFilter();
  let dataQuocGia = await moviesService.handleLoadCountryFilter();

  return res.render("movies.ejs", {
    dataMovie,
    dataGenre,
    dataCatalog,
    dataYear,
    dataQuocGia,
  });
};

module.exports = {
  getPageMovies: getPageMovies,
};
