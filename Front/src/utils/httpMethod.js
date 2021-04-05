/* Metodo función http */

import axios from "axios";

export const URL = "https://nameless-stream-81570.herokuapp.com";
export const request = async (url) => {
  try {
    const response = axios.get(url);
    return response;
  } catch (error) {
    console.error(error);
  }
};
