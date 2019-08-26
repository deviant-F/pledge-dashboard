import axios from "axios";

const baseDomain = "https://po2nqji4dg.pledgecamp.com";
const baseURL = `${baseDomain}/api`;

const axiosInstance = axios.create({ baseURL });

export const fetchCategories = async () => axiosInstance.get("/categories");

export const fetchFeaturedProjects = async () =>
  axiosInstance.get("/projects/featured/");

export const fetchProjects = async (category: string) => {
  const query = {
    params: {
      category_id: category,
      per_page: 10,
      page: 1
    }
  };
  return axiosInstance.get("/projects/filter/recently_added/", query);
};
