const axios = require("axios");
const key = process.env.API_KEY;

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://api.rawg.io/api",
      headers: { "accept-encoding": "*" },
      params: {
        key,
      },
    });
  }

  getAllGames = (orderMethod, pageNumber) => {
    if (!pageNumber) {
      if (!orderMethod) {
        return this.api.get("/games", {
          params: {
            key,
          },
        });
      }
      return this.api.get("/games", {
        params: {
          key,
          ordering: orderMethod,
        },
      });
    }

    if (pageNumber && !orderMethod) {
      return this.api.get("/games", {
        params: {
          key,
          page: pageNumber,
        },
      });
    }

    if (pageNumber && orderMethod) {
      return this.api.get("/games", {
        params: {
          key,
          page: pageNumber,
          ordering: orderMethod,
        },
      });
    }
  };

  getSingleGame = (gameId) => {
    return this.api.get(`/games/${gameId}`);
  };

  searchGame = (input) => {
    return this.api.get("/games", {
      params: {
        key,
        search: input,
      },
    });
  };
}

module.exports = ApiService;
