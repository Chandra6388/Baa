import axios from "axios";



const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_unsigned_preset"); 
  formData.append("cloud_name", "dlpeqbowx");  

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/dlpeqbowx/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Cloudinary error response: ", data);
      return null;
    }
  } catch (error) {
    console.error("Upload failed", error);
    return null;
  }
};

export default uploadToCloudinary;