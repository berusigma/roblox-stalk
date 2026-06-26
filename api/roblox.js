export default async function handler(req, res) {
  // Hanya izinkan method GET
  if (req.method !== 'GET') {
    return res.status(405).json({ status: false, message: "Method Not Allowed" });
  }

  // Ambil parameter 'user' dari URL request lu
  const { user } = req.query;

  // Cek apakah user dimasukkan
  if (!user) {
    return res.status(400).json({ 
      status: false, 
      message: "Parameter 'user' wajib diisi! Contoh: /api/roblox?user=kejuss_g" 
    });
  }

  // Ambil API Key dari environment variable Vercel
  const API_KEY = process.env.ZELAPI_KEY;

  if (!API_KEY) {
    return res.status(500).json({ 
      status: false, 
      message: "API Key belum disetting di Environment Variables Vercel." 
    });
  }

  try {
    // Request ke API asli
    const apiUrl = `https://zelapi.eu.cc/stalk/roblox?user=${user}&apikey=${API_KEY}`;
    const response = await fetch(apiUrl);
    
    // Parse hasil JSON-nya
    const data = await response.json();

    // Kirim balik hasilnya ke client/browser lu
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ 
      status: false, 
      message: "Terjadi kesalahan saat fetch data dari server asli.", 
      error: error.message 
    });
  }
}
