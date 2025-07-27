import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Gagal mengupload gambar" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Sistem Pengiriman Gambar dari ESP32</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" disabled={loading}>
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Hasil</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
