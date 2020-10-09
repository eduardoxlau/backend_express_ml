import axios from "axios";

class Api {
  url = "http://api.mercadolibre.com";
  author = {
    name: "Rafael",
    lastname: "sanchez",
  };
  results = [];
  constructor() {}

  async items(query) {
    const {
      data: { results },
    } = await axios.get(`${this.url}/sites/MLA/search?q=${query}`);
    this.results = this.orderItems(results);

    return this.results;
  }

  async item(id) {
    const { data } = await axios.get(`${this.url}/items/${id}`);
    const {
      data: { plain_text },
    } = await axios.get(`${this.url}/items/${id}/description`);

    let item = {
      id: data.id,
      title: data.title,
      price: {
        currency: data.currency_id,
        amount: data.price,
        decimals: 0,
      },
      picture: !data.pictures.length ? data.thumbnail : data.pictures[0].url,
      condition: data.condition,
      sold_quantity: data.sold_quantity,
      free_shipping: data.shipping.free_shipping,
      description: plain_text,
    };

    return { author: this.author, item };
  }

  orderItems(elements) {
    let categoriesMap = {};

    let items = elements.map((item) => {
      categoriesMap[item.category_id] =
        (categoriesMap[item.category_id] || 0) + 1;

      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: 0,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      };
    });

    let sortedCategories = Object.keys(categoriesMap).sort(
      (a, b) => categoriesMap[b] - categoriesMap[a]
    );
    let categories = sortedCategories.slice(0, 5);

    return { author: this.author, categories, items };
  }
}

export default Api;
