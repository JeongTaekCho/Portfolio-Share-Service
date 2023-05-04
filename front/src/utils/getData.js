import { get } from "../api";

export const getData = async (endPoint) => {
  try {
    const result = await get(endPoint);
    return result.data;
  } catch (err) {
    console.log(err.message);
  }
};
