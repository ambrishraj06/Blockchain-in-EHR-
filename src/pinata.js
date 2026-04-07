import axios from "axios";

const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.REACT_APP_PINATA_SECRET_KEY;
const PINATA_GATEWAY =
  process.env.REACT_APP_PINATA_GATEWAY || "https://gateway.pinata.cloud";

/**
 * Upload a file to Pinata Cloud (IPFS)
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - The IPFS CID (hash)
 */
export const uploadToPinata = async (file) => {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    throw new Error(
      "Pinata API keys not configured. Please set REACT_APP_PINATA_API_KEY and REACT_APP_PINATA_SECRET_KEY in your .env file."
    );
  }

  const formData = new FormData();
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: file.name,
    keyvalues: {
      app: "SecureEHR",
      uploadedAt: new Date().toISOString(),
    },
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      }
    );
    return res.data.IpfsHash;
  } catch (error) {
    console.error("Pinata upload error:", error);
    throw new Error("Failed to upload file to IPFS via Pinata.");
  }
};

/**
 * Upload JSON data to Pinata Cloud (IPFS)
 * @param {Object} jsonData - The JSON object to upload
 * @param {string} name - Name for the pin
 * @returns {Promise<string>} - The IPFS CID (hash)
 */
export const uploadJSONToPinata = async (jsonData, name = "SecureEHR-Data") => {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    throw new Error("Pinata API keys not configured.");
  }

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        pinataContent: jsonData,
        pinataMetadata: {
          name: name,
          keyvalues: {
            app: "SecureEHR",
            uploadedAt: new Date().toISOString(),
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      }
    );
    return res.data.IpfsHash;
  } catch (error) {
    console.error("Pinata JSON upload error:", error);
    throw new Error("Failed to upload JSON to IPFS via Pinata.");
  }
};

/**
 * Get the IPFS gateway URL for a given CID
 * @param {string} cid - The IPFS content identifier
 * @returns {string} - Full URL to access the content
 */
export const getIPFSUrl = (cid) => {
  if (!cid) return "";
  return `${PINATA_GATEWAY}/ipfs/${cid}`;
};

/**
 * Check if Pinata is configured
 * @returns {boolean}
 */
export const isPinataConfigured = () => {
  return !!(PINATA_API_KEY && PINATA_SECRET_KEY);
};
