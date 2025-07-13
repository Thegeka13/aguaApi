import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo método POST permitido" });
  }

  try {
    let data = req.body;

    // Si data viene como string, la parseamos
    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    const client = await clientPromise;
    const db = client.db("SentryHouseGas"); // Cambia aquí por tu nombre de BD
    const collection = db.collection("Agua"); // Cambia por tu colección

    const result = await collection.insertOne(data);

    res.status(201).json({ message: "Dato insertado", id: result.insertedId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al insertar dato" });
  }
}

