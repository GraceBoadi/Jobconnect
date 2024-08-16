import axios from "axios";

export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "jobConnect");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dx6euk9rq/image/upload/",
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export const updateURL = ({
  pageName,
  pageNum,
  query,
  cmpLoc,
  sort,
  navigate,
  jType,
  exp,
}) => {
  const params = new URLSearchParams();

  if (pageName && pageNum > 1) {
    params.set("page", pageNum);
  }

  if (query) {
    params.set("search", query);
  }

  if (cmpLoc) {
    params.set("location", cmpLoc);
  }

  if (sort) {
    params.set("sort", sort);
  }

  if (jType) {
    params.set("jType", jType);
  }

  if (exp) {
    params.set("exp", exp);
  }

  const newURL = `?${params.toString()}`;
  navigate(newURL, { replace: true });

  return newURL;
};
