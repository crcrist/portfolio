import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
});

const BUCKET_NAME = "connor-portfolio-context";

/**
 * Fetch a text or JSON file from GCS and return its content as string or object.
 */
export async function fetchGCSFile(fileName: string) {
  try {
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(fileName);
    const [contents] = await file.download();

    if (fileName.endsWith(".json")) {
      return JSON.parse(contents.toString("utf8"));
    }
    return contents.toString("utf8");
  } catch (err) {
    console.error(`Error reading ${fileName} from GCS:`, err);
    throw new Error("Failed to fetch file from GCS");
  }
}
