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
      console.log(response);
    }
    const data = await response.json();
    if (data.error === "Unauthorized") {
      deleteCookie(`accessToken`);
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default fetchWithToken;
