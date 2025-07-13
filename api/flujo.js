export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    let data = req.body;

    // Si viene como string, lo parseamos
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    console.log("Recibido:", data);

    res.status(200).json({ message: 'Caudal recibido', data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: 'Error procesando datos' });
  }
}
