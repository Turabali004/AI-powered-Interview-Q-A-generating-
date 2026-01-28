import { GoogleGenAI } from "@google/genai"
import { conceptExplainPrompt } from "../utils/prompts.js";
import { questionAnswerPrompt } from "../utils/prompts.js";

// @desc    Generate interview questions and answers using Gemini
// @route   POST /api/ai/generate-questions
// @access  Private
// export const generateInterviewQuestions = async (req, res) => {
//     try {
//         const { role, experience, topicsToFocus, numberOfQuestioins } = req.body;
//         if (!role || !experience || !topicsToFocus || !numberOfQuestioins) {
//             return res.status(400).json({ message: "Missing required faild" })

//         }
//         const prompt = questionAnswerPrompt({ role, experience, topicsToFocus, numberOfQuestioins })

//         // const response = await ai.models.generateContent({
//         //     model: 'gemini-2.0-flash-lite',
//         //     contents: prompt,
//         // })
//         // console.log("response:::", response)

//         const response = await ai.models.generateContent({
//             model: "gemini-3-flash-preview",
//             contents: "Explain how AI works in a few words",
//         });
//         console.log(response.text);
//         let rawText = response.text();

//         const cleanedText = rawText
//             .replace(/^```json\s*/, "") // remove starting ```json
//             .replace(/```$/, "")        // remove ending ```
//             .trim();                    // remove extra spaces

//         // Now safe to parse
//         const data = JSON.parse(cleanedText);

//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to generate questions",
//             error: error.message,
//         });
//     }
// };

// export const generateInterviewQuestions = async (req, res) => {
//     try {
//         const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

//         if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
//             return res.status(400).json({ message: "Missing required field" });
//         }

//         const prompt = questionAnswerPrompt({ role, experience, topicsToFocus, numberOfQuestions });

//         const MAX_RETRIES = 3;
//         let attempt = 0;
//         let response;

//         while (attempt < MAX_RETRIES) {
//             try {
//                 response = await ai.models.generateContent({
//                     model: "gemini-3-flash-preview",
//                     contents: prompt, // or static text for testing
//                 });
//                 break; // success, exit retry loop
//             } catch (error) {
//                 if (error.status === 429) {
//                     // API quota exceeded
//                     const retryAfter = error.details?.[2]?.retryDelay || "5s"; // fallback 5s
//                     console.warn(`Quota exceeded. Retrying in ${retryAfter}...`);
//                     const seconds = parseFloat(retryAfter) || 5;
//                     await new Promise(resolve => setTimeout(resolve, seconds * 1000));
//                     attempt++;
//                 } else {
//                     throw error; // other errors, throw
//                 }
//             }
//         }

//         if (!response) {
//             return res.status(503).json({ message: "AI API quota exceeded. Please try again later." });
//         }

//         let rawText = response.text?.() || response.output?.[0]?.content?.[0]?.text || "";
        
//         const cleanedText = rawText
//             .replace(/^```json\s*/, "")
//             .replace(/```$/, "")
//             .trim();

//         let data;
//         try {
//             data = JSON.parse(cleanedText);
//         } catch (parseError) {
//             console.warn("Failed to parse AI response as JSON:", parseError.message);
//             data = { raw: cleanedText }; // fallback if JSON invalid
//         }

//         res.status(200).json(data);
//     } catch (error) {
//         console.error("AI Generation Error:", error);
//         res.status(500).json({
//             message: "Failed to generate questions",
//             error: error.message,
//         });
//     }
// };


// import OpenAI from "openai";


// export const generateInterviewQuestions = async (req, res) => {
//   try {
//     const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

//     if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
//       return res.status(400).json({ message: "Missing required field" });
//     }

//     const prompt = questionAnswerPrompt({ role, experience, topicsToFocus, numberOfQuestions });

//     const MAX_RETRIES = 3;
//     let attempt = 0;
//     let responseText;

//     while (attempt < MAX_RETRIES) {
//       try {
//         const response = await openai.chat.completions.create({
//           model: "gpt-3.5-turbo", // or "gpt-4" if you have access
//           messages: [
//             { role: "system", content: "You are an expert interview question generator." },
//             { role: "user", content: prompt },
//           ],
//           max_tokens: 500, // adjust as needed
//           temperature: 0.7, // creativity
//         });

//         responseText = response.choices[0].message.content;
//         break; // success, exit retry loop
//       } catch (error) {
//         if (error.response && error.response.status === 429) {
//           // OpenAI rate limit hit
//           console.warn(`OpenAI rate limit hit. Retrying in 5s...`);
//           await new Promise(resolve => setTimeout(resolve, 5000));
//           attempt++;
//         } else {
//           throw error; // other errors
//         }
//       }
//     }

//     if (!responseText) {
//       return res.status(503).json({ message: "AI API quota exceeded. Please try again later." });
//     }

//     // Try to parse JSON if user expects structured questions
//     let data;
//     try {
//       const cleanedText = responseText
//         .replace(/^```json\s*/, "")
//         .replace(/```$/, "")
//         .trim();
//       data = JSON.parse(cleanedText);
//     } catch (parseError) {
//       console.warn("Failed to parse AI response as JSON:", parseError.message);
//       data = { raw: responseText }; // fallback if AI response is plain text
//     }

//     res.status(200).json(data);
//   } catch (error) {
//     console.error("AI Generation Error:", error);
//     res.status(500).json({
//       message: "Failed to generate questions",
//       error: error.message,
//     });
//   }
// };


// @desc    Generate explains a interview question
// @route   POST /api/ai/generate-explanation
// @access  Private
// export const generateConceptExplanation = async (req, res) => {
//     const { question } = req.body
//     console.log("question", question)
//     if (!question) {
//         return res.status(400).json({ message: "missing required files" })
//     }
//     const prompt = conceptExplainPrompt(question);

//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash-lite",
//         contents: prompt,
//     });

//     let rawText = response.text;

//     // Clean it: Remove ```json and ``` from beginning and end
//     const cleanedText = rawText
//         .replace(/^```json\s*/, "") // remove starting ```json
//         .replace(/```$/, "")        // remove ending ```
//         .trim();                    // remove extra spaces

//     // Now safe to parse
//     const data = JSON.parse(cleanedText);

//     res.status(200).json(data);
// };

import OpenAI from "openai";


// import fetch from "node-fetch";

// export const generateConceptExplanation = async (req, res) => {
//   try {
//     const { question } = req.body;

//     if (!question) {
//       return res.status(400).json({ message: "Missing required field" });
//     }

//     const prompt = conceptExplainPrompt(question); // your existing prompt function

//     const MAX_RETRIES = 3;
//     let attempt = 0;
//     let responseText;

//     while (attempt < MAX_RETRIES) {
//       try {
//         const response = await openai.chat.completions.create({
//           model: "gpt-3.5-turbo", // or "gpt-4" if available
//           messages: [
//             { role: "system", content: "You are an expert AI teacher, explaining concepts clearly." },
//             { role: "user", content: prompt },
//           ],
//           max_tokens: 500,
//           temperature: 0.7,
//         });

//         responseText = response.choices[0].message.content;
//         break; // success, exit retry loop
//       } catch (error) {
//         if (error.response && error.response.status === 429) {
//           console.warn(`OpenAI rate limit hit. Retrying in 5s...`);
//           await new Promise(resolve => setTimeout(resolve, 5000));
//           attempt++;
//         } else {
//           throw error; // other errors
//         }
//       }
//     }

//     if (!responseText) {
//       return res.status(503).json({ message: "AI API quota exceeded. Please try again later." });
//     }

//     // Clean and parse JSON if needed
//     let data;
//     try {
//       const cleanedText = responseText
//         .replace(/^```json\s*/, "")
//         .replace(/```$/, "")
//         .trim();

//       data = JSON.parse(cleanedText);
//     } catch (parseError) {
//       console.warn("Failed to parse AI response as JSON:", parseError.message);
//       data = { raw: responseText }; // fallback if AI response is plain text
//     }

//     res.status(200).json(data);
//   } catch (error) {
//     console.error("AI Generation Error:", error);
//     res.status(500).json({
//       message: "Failed to generate explanation",
//       error: error.message,
//     });
//   }
// };


import fetch from "node-fetch";


export const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required field" });
        }

        const prompt = questionAnswerPrompt({ role, experience, topicsToFocus, numberOfQuestions });

        // Hugging Face Configuration
        const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
        const HF_API_KEY = process.env.HF_API_KEY; // Always use env variables
        
        // Choose a modern model (e.g., Llama 3.1 8B is excellent for JSON)
        const MODEL = "meta-llama/Llama-3.1-8B-Instruct"; 

        const MAX_RETRIES = 3;
        let attempt = 0;
        let response;

        while (attempt < MAX_RETRIES) {
            try {
                const fetchResponse = await fetch(HF_API_URL, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${HF_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: MODEL,
                        messages: [
                            { role: "system", content: "You are a professional interviewer. Return only valid JSON." },
                            { role: "user", content: prompt }
                        ],
                        max_tokens: 1500,
                        temperature: 0.7,
                    }),
                });

                if (!fetchResponse.ok) {
                    const errorData = await fetchResponse.json();
                    // Handle Quota/Rate Limits (429)
                    if (fetchResponse.status === 429) {
                        throw { status: 429, details: errorData };
                    }
                    throw new Error(errorData.error || `HTTP error ${fetchResponse.status}`);
                }

                response = await fetchResponse.json();
                break; // success
            } catch (error) {
                if (error.status === 429 && attempt < MAX_RETRIES - 1) {
                    console.warn(`Quota exceeded. Retrying attempt ${attempt + 1}...`);
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s
                    attempt++;
                } else {
                    throw error;
                }
            }
        }

        // Extracting content from OpenAI-compatible format
        const rawText = response.choices[0]?.message?.content || "";
        
        // Clean markdown JSON wrappers
        const cleanedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();

        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch (parseError) {
            console.warn("JSON Parse Error. Raw output:", rawText);
            data = { raw: cleanedText }; 
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Hugging Face Generation Error:", error);
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};


export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "Missing required field" });

    const prompt = conceptExplainPrompt(question);
    const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";

    // Use process.env - DO NOT hardcode the key here
    const apiKey = process.env.HF_API_KEY; 
    console.log("HF_API_KEY", process.env.HF_API_KEY)
    // console.log("HF_API_KEY", HF_API_KEY)

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY.trim()}`, // .trim() is your best friend here,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.1-8B-Instruct", 
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // This will now catch the "Insufficient Permissions" error specifically
      throw new Error(data.error?.message || data.error || "AI Provider Error");
    }

    const generatedText = data.choices?.[0]?.message?.content || "No explanation generated";
    res.status(200).json({ explanation: generatedText });

  } catch (error) {
    console.error("HF AI Error:", error.message);
    res.status(500).json({ message: "AI Generation Failed", error: error.message });
  }
};



// module.exports = { generateInterviewQuestions, generateConceptExplanation };