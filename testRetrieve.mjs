import { retrieveRelevant } from "./lib/rag/retrieve.js";

const result = await retrieveRelevant("Tell me about Connor's Tableau experience");
console.log(JSON.stringify(result, null, 2));
