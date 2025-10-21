import fs from "fs";
import path from "path";
import { cosSim } from "./embedText";

export type VecItem = {
  id: string;
  source: string;      // e.g. "resume.txt" or "projects.json#2"
  text: string;
  embedding: number[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "embeddings.json");

// In-memory singleton
let MEM: VecItem[] | null = null;

export function loadStore(): VecItem[] {
  if (MEM) return MEM;
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
    if (!fs.existsSync(FILE)) {
      fs.writeFileSync(FILE, "[]", "utf8");
    }
    const raw = fs.readFileSync(FILE, "utf8");
    MEM = JSON.parse(raw);
  } catch {
    MEM = [];
  }
  return MEM!;
}

export function saveStore(items: VecItem[]) {
  MEM = items;
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  fs.writeFileSync(FILE, JSON.stringify(items, null, 2), "utf8");
}

/** Simple top-K search */
export function search(queryEmbedding: number[], k = 5) {
  const items = loadStore();
  const scored = items.map(it => ({ it, score: cosSim(queryEmbedding, it.embedding) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k).map(s => ({ ...s.it, score: s.score }));
}
