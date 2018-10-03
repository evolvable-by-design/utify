import axios from "axios";

export default {
  //pass search keyword
  passKeyword: function(searchKeyword, userid) {
    return axios.post("/api/search", searchKeyword, userid);
  }
  // googleAuth: function() {
  //   return axios.get("/auth/google");
  // }
};
