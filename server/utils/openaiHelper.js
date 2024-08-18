const { OpenAI } = require('openai');

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Ensure your .env file is correctly set up
});

async function generateUnitTests(code) {
  try {
    // Request completion from the OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo', // Use the correct model name
      messages: [
        { role: 'user', content: `Generate unit tests for the following code:\n\n${code}` }
      ]
    });

    // Return the generated unit tests
    return completion.data.choices[0].message.content;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error generating unit tests:', error.response ? error.response.data : error.message);
    throw new Error('Failed to generate unit tests');
  }
}

module.exports = { generateUnitTests };
