import axios from "axios";

class Api {
  url = "http://api.mercadolibre.com";

  author = {
    name: "Rafael",
    lastname: "sanchez",
  };
  constructor() {}

  async items(query) {
    const {
      data: { results, filters },
    } = await axios.get(`${this.url}/sites/MLA/search?q=${query}`);
    let items = this.orderItems(results);
    let categories = this.getCategory(results, filters);

    return { author: this.author, categories: categories, items };
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
      sold: data.sold_quantity,
    };

    return {
      author: this.author,
      categories: [item.id, item.title],
      item,
    };
  }

  orderItems(elements) {
    let items = elements.map((item) => {
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
        city: item.address.city_name,
      };
    });

    return items;
  }

  getCategory(elements, filters = []) {
    let categoriesMap = {};
    let categoryMostCommon = { count: 0, id: null };

    if (!filters.length) return [];

    elements.forEach((item) => {
      categoriesMap[item.category_id] =
        (categoriesMap[item.category_id] || 0) + 1;

      if (categoriesMap[item.category_id] > categoryMostCommon.count) {
        categoryMostCommon = {
          count: categoriesMap[item.category_id],
          id: item.category_id,
        };
      }
    });

    let category = filters.filter((el) => el.id == "category");

    let { values } = category.find((el) => (el.id = categoryMostCommon.id));

    return values
      .map((el) => el.path_from_root.map((path) => path.name))
      .flat();
  }
}

export default Api;
