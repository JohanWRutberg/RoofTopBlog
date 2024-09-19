import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Invalid/Missing Environment Variable: MONGODB_URI");
}

const options = {};
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;

export async function getSortedPostsData() {
  try {
    const client = await clientPromise;
    const db = client.db("blogdata");
    const collection = db.collection("blogtest");

    // Fetch posts with the createdAt field
    const posts = await collection.find({}, { projection: { slug: 1, createdAt: 1 } }).toArray();

    // Log the posts to check the createdAt field
    console.log(posts);

    // Sort posts by createdAt
    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return sortedPosts;
  } catch (error) {
    console.error("Failed to fetch posts data:", error);
    return [];
  }
}
