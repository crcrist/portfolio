import { VertexAI } from "@google-cloud/vertexai";
const vertex = new VertexAI({ project: "optical-name-470223-i3", location: "us-central1" });
const model = vertex.getGenerativeModel({ model: "gemini-2.5-flash" });

const resp = await model.generateContent({
  contents: [{ role: "user", parts: [{ text: "Say hi in one sentence." }] }],
});

console.log(resp.response.candidates[0].content.parts[0].text);
