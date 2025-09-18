const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, // notice it's singular, not URL_ENDPOINTS
});

async function uploadFile(file, fileName) {
  try {
    const result = await imagekit.upload({
      file,
      fileName,
    });
    return result;
  } catch (err) {
    console.error("ImageKit upload failed:", err.message);
    throw err;
  }
}

module.exports = { uploadFile };
