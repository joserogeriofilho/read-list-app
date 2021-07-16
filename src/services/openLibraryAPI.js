import axios from "axios";

// Using the Node adapter to enable testing with Nock
axios.defaults.adapter = require('axios/lib/adapters/http');

const api = axios.create({
  baseURL: "https://openlibrary.org",
});

export const search = title => {
  return api.get("search.json", { params: { title } }).then( result => {
    return result.data.docs.map(item => ({
      title: item.title,
      author: item.author_name ? item.author_name.join() : 'Unknown author',
      key: item.key
    }));
  });
}
