import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Parsing error", err);
      return res.status(500).json({ error: "Upload gagal" });
    }

    const file = files.file;
    const buffer = fs.readFileSync(file.filepath);

    // Saat ini kita hanya return ukuran file sebagai bukti berhasil
    return res.status(200).json({
      message: "Gambar diterima di Vercel",
      ukuran: buffer.length,
    });
  });
}
