import { GoogleGenerativeAI } from "@google/generative-ai"
const genAI = new GoogleGenerativeAI("AIzaSyCxWlhYGDD28oY8FwZ1EWB3DmggG0LiFRk");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



export async function getAssistance(prompt) {

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    

    return text;
}