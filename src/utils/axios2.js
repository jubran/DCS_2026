import axios from "axios";

import { ASSETS_API } from "src/config-global";
// ----------------------------------------------------------------------

const axiosInstanceAssets = axios.create({ baseURL: ASSETS_API });

axiosInstanceAssets.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong",
    ),
);

export default axiosInstanceAssets;

// ----------------------------------------------------------------------

export const fetcher2 = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstanceAssets.get(url, { ...config });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints2 = {
  dcs: {
    today: "/api.php?action=getDcsData",
  },
};
