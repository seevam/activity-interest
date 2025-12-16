import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { interestCards, careerClusters } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phase1Data, phase2Data, sessionData } = body;

    if (!phase1Data || !phase2Data) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Build the prompt
    const prompt = buildPrompt(phase1Data, phase2Data);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            'You are a career counselor analyzing a middle school student\'s interest inventory results. Provide warm, personalized guidance in JSON format.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 1500,
    });

    const result = completion.choices[0].message.content;

    // Parse JSON with proper error handling
    let profile;
    try {
      profile = JSON.parse(result || '{}');
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      return NextResponse.json(
        { error: 'Invalid response format from AI service' },
        { status: 500 }
      );
    }

    return NextResponse.json({ profile });
  } catch (error: any) {
    console.error('Error generating profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate profile' },
      { status: 500 }
    );
  }
}

function buildPrompt(phase1Data: any, phase2Data: any): string {
  // Get card labels
  const energizesLabels = phase1Data.energizesMe
    .map((id: number) => interestCards.find((c) => c.id === id)?.label)
    .filter(Boolean);

  const curiousLabels = phase1Data.curiousAbout
    .map((id: number) => interestCards.find((c) => c.id === id)?.label)
    .filter(Boolean);

  const notForMeLabels = phase1Data.notForMe
    .map((id: number) => interestCards.find((c) => c.id === id)?.label)
    .filter(Boolean);

  // Build scenario summary
  const scenarioSummary = phase2Data.scenarios
    .map((s: any, idx: number) => {
      return `Scenario ${idx + 1}: Chose "${s.primaryChoice}" and "${s.followUpChoice}" (Trait: ${s.trait})`;
    })
    .join('\n');

  return `You are a career counselor analyzing a middle school student's interest inventory results.

STUDENT INTERESTS:

Cards that ENERGIZE them:
${energizesLabels.join(', ')}

Cards they're CURIOUS about:
${curiousLabels.join(', ')}

Cards NOT of interest:
${notForMeLabels.join(', ')}

SCENARIO RESPONSES:
${scenarioSummary}

TASK:
Create a warm, personalized 200-word narrative summary that:
1. Opens with an engaging observation about what makes this student unique
2. Identifies 3 core interest themes with specific examples from their responses
3. Connects their interests to 2-3 of the 16 Career Clusters below
4. Ends with an encouraging statement about exploration

16 CAREER CLUSTERS:
${careerClusters.map((c, i) => `${i + 1}. ${c}`).join('\n')}

TONE: Enthusiastic, personalized, age-appropriate for grades 6-8
FORMAT: 3-4 short paragraphs, plain text
AVOID: Generic praise, listing everything, being overwhelming

RESPONSE FORMAT (JSON):
{
  "narrative": "200-word personalized summary here",
  "topThemes": [
    {
      "emoji": "🎨",
      "title": "Creative Problem-Solver",
      "description": "Brief 2-sentence explanation with examples"
    },
    {
      "emoji": "🤝",
      "title": "Helper & Connector",
      "description": "Brief 2-sentence explanation"
    },
    {
      "emoji": "🔧",
      "title": "Hands-On Builder",
      "description": "Brief 2-sentence explanation"
    }
  ],
  "recommendedClusters": [
    {
      "name": "Arts, A/V Technology & Communications",
      "reason": "Your love of design and creative expression aligns with...",
      "sampleCareers": ["Graphic Designer", "UX Designer", "Animator"]
    },
    {
      "name": "Information Technology",
      "reason": "Your interest in coding and problem-solving...",
      "sampleCareers": ["Software Developer", "Web Designer", "Data Analyst"]
    }
  ]
}`;
}
