import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Solo método GET permitido" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("SentryHouseGas");
    const collection = db.collection("Agua");

    const datos = await collection
      .find({})
      .sort({ _id: -1 }) // del más nuevo al más viejo
      .limit(10)
      .toArray();

    res.status(200).json(datos);
  } catch (error) {
    console.error("Error al obtener datos de Agua:", error);
    res.status(500).json({ error: "Error al obtener datos" });
  }
}
