import { redirect } from "next/navigation";
import { baseUrl } from "./constant";

import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

const fetchWithToken = async (path, token, options = {}) => {
  const url = `${baseUrl}/${path}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data === "Internal Server Error") {
      return data;
    }
    if (data.error === "Unauthorized") {
      deleteCookie(`accessToken`);
    }
    // if (!response.ok) {
    //   console.log("fetch with token failed", url, options);
    //   return "failed";
    // } else {
    //   const data = await response.json();
    //   if (data.error === "Unauthorized") {
    //     deleteCookie(`accessToken`);
    //   }

    //   return data;
    // }
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default fetchWithToken;
