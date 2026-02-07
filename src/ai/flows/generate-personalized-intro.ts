'use server';

/**
 * @fileOverview AI flow to generate a personalized introduction for Atharva Bhatnagar.
 *
 * - generatePersonalizedIntro - A function that generates the personalized intro.
 * - GeneratePersonalizedIntroInput - The input type for the generatePersonalizedIntro function.
 * - GeneratePersonalizedIntroOutput - The return type for the generatePersonalizedIntro function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedIntroInputSchema = z.object({
  name: z.string().describe('The name of the person.'),
  interests: z.string().describe('Interests of the person, comma separated.'),
  projects: z.string().describe('Projects of the person, comma separated.'),
});
export type GeneratePersonalizedIntroInput = z.infer<typeof GeneratePersonalizedIntroInputSchema>;

const GeneratePersonalizedIntroOutputSchema = z.object({
  intro: z.string().describe('A personalized introduction paragraph.'),
});
export type GeneratePersonalizedIntroOutput = z.infer<typeof GeneratePersonalizedIntroOutputSchema>;

export async function generatePersonalizedIntro(
  input: GeneratePersonalizedIntroInput
): Promise<GeneratePersonalizedIntroOutput> {
  return generatePersonalizedIntroFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedIntroPrompt',
  input: {schema: GeneratePersonalizedIntroInputSchema},
  output: {schema: GeneratePersonalizedIntroOutputSchema},
  prompt: `Compose a personalized introduction paragraph for {{name}}. \
They are passionate about the following interests: {{interests}}. \
Their notable projects include: {{projects}}. \
The introduction should highlight their skills, experience and passion. Keep it concise and engaging.`,
});

const generatePersonalizedIntroFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedIntroFlow',
    inputSchema: GeneratePersonalizedIntroInputSchema,
    outputSchema: GeneratePersonalizedIntroOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
