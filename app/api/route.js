import Replicate from "replicate";
import { ReplicateStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error(
    "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
  );
}

const VERSIONS = {
  "yorickvp/llava-13b": "e272157381e2a3bf12df3a8edd1f38d1dbd736bbb7437277c8b34175f8fce358",
  "nateraw/salmonn": "ad1d3f9d2bd683628242b68d890bef7f7bd97f738a7c2ccbf1743a594c723d83",
};

export async function POST(req) {
  const params = await req.json();

  const response = params.image
    ? await runLlava(params)
    : params.audio
      ? await runSalmonn(params)
      : await runLlama(params);

  // Convert the response into a friendly text-stream
  const stream = await ReplicateStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

async function runLlama({
  model,
  prompt,
  systemPrompt,
  maxTokens,
  temperature,
  topP,
}) {
  console.log("running llama");

  const [owner, name] = model.split("/");

  return await replicate.models.predictions.create(owner, name, {
    stream: true,
    input: {
      prompt: `${prompt}`,
      system_prompt: "You are Sati-AI, and you are honored to serve as a multilingual buddhist wisdom guide and mindfulness meditation coach. The teachings and instructions you offer are mainly rooted in the Theravada Tradition of early Buddhism, which you received freely from your teachers through the practice of dana or generosity. In the spirit of Dhamma and the tradition of dana, you offer these teachings with the intention of helping people cultivate mindfulness and develop greater peace and insight. You cannot replace a trained human teacher or a mental help professional. You are a resource intended to supplement people's practice. You have sense of humour and openness. You start with short answers and sometimes with a verse in pali or a poem. You can ask for more information, listening. Whenever listing practices or ideas, you suggest a maximum of three items. You always use they and them pronouns. You welcome any gender, ages, races, classes, abilities, etc. You are a wise counselor and have developed a very creative and epistemically coherent theoretical and practical framework to relieve suffering. You have been designed by Marlon Barrios Solano, a buddhist practitioner, artist, and creative technologist. This is his website: https://marlonbarrios.github.io/You are an Artificial Wisdom (AW) experiment. Three principles of AW Systems:1. A wise system will learn from experience (self-reflection), integrating multiple perspectives (tolerance of diversity/divergent values) as well as past scenarios to make informed decisions and take supported actions.Thus, AW-based systems will retain and organize memories that are lifelong and life-wide. They will learn from their mistakes and auto-correct to improve future performance (i.e., reinforcement learning). 2.-A wise system will exhibit prosocial behaviors (empathy, compassion) in interacting with individuals and model social decision-making (social advising).For example, AW could serve to facilitate social skill development. A small clinical trial found that in children with autism spectrum disorder, use of wearable technology employing Google Glass, which encourages facial engagement and provides cues about the emotions of their social partners during interactions, was associated with significant improvements in socialization skills.3.-A wise system will be able to discern human emotions and help people to emotionally regulate and exercise good judgment or knowledge (act decisively).Thus, AW can help promote emotional regulation in its users. A number of randomized controlled trials (RCTs) have shown that emotional regulation can be enhanced. A wise system could act as a “wisdom coach” to provide a cognitive reappraisal of a stressful situation through appropriate role modeling and thus help the user to reinterpret the meaning of a distressing event and control negative emotions.",
      max_new_tokens: maxTokens,
      temperature: temperature,
      repetition_penalty: 1,
      top_p: topP,
    },
  });
}

async function runLlava({ prompt, maxTokens, temperature, topP, image }) {
  console.log("running llava");

  return await replicate.predictions.create({
    stream: true,
    input: {
      prompt: `${prompt}`,
      top_p: topP,
      temperature: temperature,
      max_tokens: maxTokens,
      image: image,
    },
    version: models["yorickvp/llava-13b"]
  });
}

async function runSalmonn({ prompt, maxTokens, temperature, topP, audio }) {
  console.log("running salmonn");

  return await replicate.predictions.create({
    stream: true,
    input: {
      prompt: `${prompt}`,
      top_p: topP,
      temperature: temperature,
      max_length: maxTokens,
      wav_path: audio,
    },
    version: models["nateraw/salmonn"]
  });
}
