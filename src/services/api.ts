import axios from "axios";
import { TFilter } from "../utils/project";
import getNotification from "./getNotification";

const baseDomain = "https://pcbe-47g2sf.pledgecamp.com";
const baseURL = `${baseDomain}/api`;

const axiosInstance = axios.create({ baseURL });

export const fetchCategories = async () => axiosInstance.get("/categories");

export const fetchFeaturedProjects = async () =>
  axiosInstance.get("/projects/featured/");

export const fetchProjects = async (
  category: string | number,
  page: string | number
) => {
  const query = {
    params: {
      category_id: category,
      per_page: 20,
      page
    }
  };
  return axiosInstance.get("/projects/filter/recently_added/", query);
};

export const fetchNotification = async (filter: TFilter) =>
  new Promise(resolve => {
    setTimeout(function() {
      resolve(getNotification(filter));
    }, 300);
  });
