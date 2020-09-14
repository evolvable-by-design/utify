import React, { useEffect, useState } from "react";
import Pivo from "@evolvable-by-design/pivo";
import API from "../utils/API";
import config from "./config";

const withApi = (Component) => ({ props }) => {
  const [pivo, setPivo] = useState()

  useEffect(() => {
    Pivo.fetchDocumentationAndCreate(
      config['DOCUMENTATION_URL'],
      config['DOCUMENTATION_FETCHING_METHOD']
    ).then(setPivo)
  }, [])

  if (pivo !== undefined) {
    return <Component api={new API(pivo)} {...props} />
  } else {
    return <p>Loading...</p>
  }
}

export default withApi