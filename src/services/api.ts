import axios from "axios";

const baseDomain = "https://po2nqji4dg.pledgecamp.com";
const baseURL = `${baseDomain}/api`;

const axiosInstance = axios.create({ baseURL });

export const fetchCategories = async () => axiosInstance.get("/categories");
