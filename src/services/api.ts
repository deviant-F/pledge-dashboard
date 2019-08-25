import axios from "axios";

const baseDomain = "https://po2nqji4dg.pledgecamp.com";
const baseURL = `${baseDomain}/api`;

const axiosInstance = axios.create({ baseURL });

export const fetchCategories = async () => axiosInstance.get("/categories");

//dummy api calls for a list of projects
export const fetchProjects = async () =>
  axiosInstance.get("/projects/search?query=egg");
