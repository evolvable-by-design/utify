import axios from "axios"
import { Vocabulary } from '../vocabulary';

export default class API {

  constructor (pivo) {
    this.pivo = pivo
  }

  async passKeyword (searchKeyword) {
    const operation = (await this.pivo.does(Vocabulary.search)).getOrUndefined()

    if (operation !== undefined) {
      return operation.invoke(searchKeyword)
    } else {
      throw new Error('Impossible to perform search')
    }
  }

  static passUserId(userid) {
    return axios.post("/api/profile", userid);
  }

  static passUserIdVideo(userid) {
    return axios.post("/api/library", userid);
  }

  async passUserIdVideoLibraryResults (userid, tag) {
    const operation = (await this.pivo.does(Vocabulary.libraryResults)).getOrUndefined()

    if (operation !== undefined) {
      return operation.invoke({ [Vocabulary.userId]: userid, [Vocabulary.tag]: tag })
    } else {
      throw new Error('Impossible to get library results')
    }
  }

}