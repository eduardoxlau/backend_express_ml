import axios from "axios";
import "babel-polyfill";
import Api from "../../src/api";
import default_items from "./data/default_items.json";
import organized_items from "./data/organized_items.json";
import default_item from "./data/default_item.json";
import organized_item from "./data/organized_item.json";
import default_item_description from "./data/default_item_description.json";

let api = new Api();
jest.mock("axios");

it("fetches data from api for items", async () => {
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: default_items })
  );

  let items = await api.items("anything");
  expect(items).toEqual(organized_items);
});

it("fetches data from api for item/:id", async () => {
  axios.get.mockImplementationOnce((url) =>
    Promise.resolve({ data: default_item })
  );
  axios.get.mockImplementationOnce((url) =>
    Promise.resolve({ data: default_item_description })
  );

  let item = await api.item("1");
  expect(item).toEqual(organized_item);
});
