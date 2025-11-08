import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_AI_IMAGE_VERIFICATION_URL;

export const uploadImage = async (formData: FormData) => {
  const res = await axios.post(`${API_URL}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
