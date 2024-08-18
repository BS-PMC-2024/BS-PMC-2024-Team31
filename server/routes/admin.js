// services/chatgptService.js
const axios = require('axios');

const chatGptApiKey = process.env.CHATGPT_API_KEY; // أضف مفتاح API الخاص بك إلى المتغيرات البيئية

const chatGptApiUrl = 'https://api.openai.com/v1/chat/completions';

async function getChatGptResponse(prompt) {
    try {
        const response = await axios.post(
            chatGptApiUrl,
            {
                model: "gpt-3.5-turbo", // أو أي نموذج آخر تستخدمه
                messages: [
                    { role: "system", content: "أنت مساعد مفيد." },
                    { role: "user", content: prompt }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${chatGptApiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("خطأ في استدعاء واجهة برمجة التطبيقات ChatGPT:", error);
        throw error;
    }
}

module.exports = { getChatGptResponse };
