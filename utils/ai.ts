import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import z from "zod";
import { PromptTemplate } from "langchain/prompts";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    color: z
      .string()
      .describe(
        "a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness."
      ),
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry"),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (i.e. does it contain negative emotions?)."
      ),
    subject: z.string().describe("the subject of the journal entry"),
    summary: z.string().describe("quick summary of the entry"),
  })
);

const getPrompt = async (content: string) => {
  const formatted_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{formatted_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { formatted_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
  });
  const result = await model.call(input);

  try {
    return parser.parse(result);
  } catch (error) {
    console.error(error);
  }
};
