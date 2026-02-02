const API_URL = process.env.NEXT_PUBLIC_AI_IMAGE_VERIFICATION_URL;

export const uploadImage = async (formData: FormData) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return response.json();
};
