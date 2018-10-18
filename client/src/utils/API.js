import axios from "axios";

export default {
  //pass search keyword
  passKeyword: function(searchKeyword, userid) {
    return axios.post("/api/search", searchKeyword, userid);
  },

  passUserId: function(userid) {
    return axios.post("/api/profile", userid);
  },

  passUserIdVideo: function(userid) {
    return axios.post("/api/library", userid);
  },
  passUserIdVideoLibraryResults: function(userid) {
    return axios.post("/api/libraryResults", userid);
  },
  passUserChip: function(userid) {
    return axios.post("/api/chipInsert", userid);
  },
  passUserIdGetChipData: function(userid) {
    return axios.post("api/chipData", userid);
  }
};
