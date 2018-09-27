import axios from "axios";

export default {
  //pass search keyword
  passKeyword: function(searchKeyword) {
    return axios.post("/api/search", searchKeyword);
  }
};
