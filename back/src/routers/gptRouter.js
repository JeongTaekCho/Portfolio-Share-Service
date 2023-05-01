import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.GPT_KEY,
});
const openai = new OpenAIApi(configuration);

const gptRouter = Router();

gptRouter.post("/", async (req, res) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      },
    });
    return;
  }

  const question = req.body.question || "";

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `I am a highly intelligent question answering bot. If you ask me ${question} that is rooted in truth, I will give you the answer to Korean. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"잘 모르겠습니다.\".\n`,
    temperature: 0,
    max_tokens: 250,
  });

  res.status(200).json({ result: response.data.choices[0].text });
});

export { gptRouter };
