import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyAKPnidrivCN8HQtTjPGVKVjdz6fiB7hzg';
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    console.log(data.models.map(m => m.name).join(', '));
  } catch (e) {
    console.error(e);
  }
}

listModels();
