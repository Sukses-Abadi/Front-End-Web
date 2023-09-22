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
    // console.log("response.ok <<<<<<<<<<<<<<<<<<<", response.ok);
    if (!response.ok) {
      deleteCookie(`accessToken`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default fetchWithToken;
