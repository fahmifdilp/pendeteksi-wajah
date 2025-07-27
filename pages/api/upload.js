import { writeFile } from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Hanya POST yang diperbolehkan" });
  }

  let data = Buffer.from([]);

  req.on("data", chunk => {
    data = Buffer.concat([data, chunk]);
  });

  req.on("end", async () => {
    // Simpan file (opsional, untuk testing)
    await writeFile(`/tmp/upload.jpg`, data);

    res.status(200).json({
      message: "Gambar diterima",
      ukuran: data.length,
    });
  });
}
