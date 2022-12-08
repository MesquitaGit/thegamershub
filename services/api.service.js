const axios = require("axios");
const key = process.env.API_KEY;

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://api.rawg.io/api",
      params: {
        key,
      },
    });
  }

  getAllGames = (pageNumber) => {
    if (!pageNumber) {
      return this.api.get("/games", {
        params: {
          key,
        },
      });
    }

    return this.api.get("/games", {
      params: {
        key,
        page: pageNumber,
      },
    });
  };

  getSingleGame = (gameId) => {
    return this.api.get(`/games/${gameId}`);
  };
}

module.exports = ApiService;
