// /api/user-data.js
import axios from "axios";

export default async function handler(req, res) {
  // Allow only GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { contact_id } = req.query;
  console.log("Fetching user data for contact_id:", contact_id);

  const API_BASE_URL = process.env.API_BASE_URL;
  const PROJECT_ID = process.env.PROJECT_ID;
  const API_KEY = process.env.API_KEY;

  const FETCH_USER_DATA_URL = `${API_BASE_URL}/projects/${PROJECT_ID}/tables/DT17df762382dd3f3c/rows`;

  try {
    // Build headers — equivalent to your previous getHeaders() logic
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${API_KEY}:`).toString("base64")}`,
    };

    // Call external API
    const response = await axios.get(
      `${FETCH_USER_DATA_URL}?contact_id=${contact_id}`,
      { headers }
    );

    console.log("Fetched User Data:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch user data" });
  }
}
