import axios from "axios";

const baseDomain = "https://pcbe-47g2sf.pledgecamp.com";
const baseURL = `${baseDomain}/api`;

const axiosInstance = axios.create({ baseURL });

export const fetchCategories = async () => axiosInstance.get("/categories");

export const fetchFeaturedProjects = async () =>
  axiosInstance.get("/projects/featured/");

export const fetchProjects = async (
  category: string | number,
  page: number
) => {
  const query = {
    params: {
      category_id: category,
      per_page: 10,
      page
    }
  };
  return axiosInstance.get("/projects/filter/recently_added/", query);
};
