import axios from "axios";

export const URL = "https://infinite-castle-48786.herokuapp.com";
export const request = async (url) => {
  try {
    const response = axios.get(url);
    return response;
  } catch (error) {
    console.error(error);
  }
};
