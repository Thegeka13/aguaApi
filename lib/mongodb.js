import { MongoClient } from "mongodb";

const uri = "mongodb+srv://JosueIoT:Aronwite0312@cluster0.vr6tb.mongodb.net/SentryHouseGas?retryWrites=true&w=majority&appName=Cluster0";
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Cadena de conexión no definida");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
