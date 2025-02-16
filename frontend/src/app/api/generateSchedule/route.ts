import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Validate the OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not defined in environment variables');
}

const openai = new OpenAI({
  apiKey: apiKey,
});

export async function POST(request: Request) {
  try {
    const { classes } = await request.json();

    // Validate input
    if (!classes || typeof classes !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: classes must be a string' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      messages: [{
        role: "system",
        content: `You are a helpful university course planner. The number of hours a course is, is the last digit of the course number
        for example: CS 1021 is 1 hour, CS 1023 is 3 hours, etc. Consider the letters M, T, W, R, F as days of the week respectively.
        I want the schedule to have at most 16 hours and minimum 12 hours. 
        Use this JSON format:
        {
          "schedule": [
            {
              "semester": "Season Year",
              "courses": []
            }
          ]
        }`
      }, {
        role: "user",
        content: `Here are my required courses: ${classes}`
      }],
      model: "gpt-4o",
      response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0].message.content;
    if (responseText === null) {
      throw new Error('Response text is null');
    }
    const parsedResponse = JSON.parse(responseText);

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate schedule' },
      { status: 500 }
    );
  }
}