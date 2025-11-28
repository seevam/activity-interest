# Interest Discovery Activity - Ascend Now

A complete, interactive web-based activity for middle school students to discover their interests and explore career pathways. Built with Next.js, TypeScript, and OpenAI integration.

## Features

### 🌟 Complete 4-Phase Activity Flow
1. **BUILD** - Interest Constellation (Drag & Drop 25 interest cards)
2. **MEASURE** - Scenario Explorer (4 scenario-based questions)
3. **ANALYZE** - AI Interest Profile (OpenAI-powered analysis)
4. **DECIDE** - Results & PDF Download

### 🎨 Duolingo-Inspired Design
- Friendly, approachable interface
- Bright, encouraging colors
- Large, tappable elements
- Clear progress indicators
- Celebration moments
- Minimal text, maximum visual clarity

### ✨ Key Features
- **Drag & Drop Interface** - Intuitive card sorting with @dnd-kit
- **Real-time Progress Tracking** - Visual progress bar throughout
- **AI-Powered Analysis** - OpenAI generates personalized interest profiles
- **PDF Report Generation** - Downloadable comprehensive reports
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Accessibility** - WCAG 2.1 AA compliant
- **State Persistence** - Session data saved in localStorage

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Drag & Drop:** @dnd-kit
- **Animations:** Framer Motion
- **State Management:** Zustand (with persistence)
- **AI Integration:** OpenAI API
- **PDF Generation:** jsPDF
- **Charts:** Recharts
- **Confetti:** canvas-confetti

## Getting Started

### Prerequisites
- Node.js 18+ installed
- OpenAI API key

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
activity-interest/
├── app/
│   ├── api/
│   │   └── generate-profile/
│   │       └── route.ts          # OpenAI API integration
│   ├── globals.css               # Global styles & Tailwind
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application entry
├── components/
│   ├── phases/
│   │   ├── WelcomeScreen.tsx     # Phase 0: Welcome
│   │   ├── InstructionsScreen.tsx# Phase 0: Instructions
│   │   ├── CardSortingScreen.tsx # Phase 1: Card sorting
│   │   ├── ScenariosScreen.tsx   # Phase 2: Scenarios
│   │   ├── LoadingScreen.tsx     # Phase 3: AI loading
│   │   └── ResultsScreen.tsx     # Phase 4: Results
│   ├── Button.tsx                # Reusable button component
│   ├── ProgressBar.tsx           # Progress indicator
│   ├── InterestCard.tsx          # Draggable interest card
│   └── DropZone.tsx              # Drop zone component
├── lib/
│   ├── data.ts                   # Interest cards & scenarios
│   ├── types.ts                  # TypeScript types
│   ├── store.ts                  # Zustand store
│   └── pdf-generator.ts          # PDF generation utility
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Activity Flow

### Phase 1: BUILD - Interest Constellation (3 minutes)
Students drag and drop 25 interest cards into three zones:
- 🔥 **Energizes Me** - Activities that excite them
- 🤔 **Curious About** - Want to learn more
- 😐 **Not For Me** - Doesn't interest them

### Phase 2: MEASURE - Scenario Explorer (4 minutes)
Four scenario-based questions with follow-ups:
1. Saturday afternoon activities
2. Discovering a new skill
3. School project roles
4. After-school time

### Phase 3: ANALYZE - AI Profile Generation (2-3 minutes)
OpenAI analyzes responses and generates:
- Personalized narrative summary (200 words)
- Top 3 interest themes
- Recommended career clusters from the 16 Career Clusters framework

### Phase 4: DECIDE - Results & Download (1 minute)
Students review their profile and can:
- Download comprehensive PDF report
- View mentor discussion questions
- Explore recommended career clusters
- Restart the activity

## API Routes

### POST /api/generate-profile
Generates AI-powered interest profile based on student responses.

**Request Body:**
```json
{
  "phase1Data": {
    "energizesMe": [1, 2, 6, ...],
    "curiousAbout": [4, 7, 13, ...],
    "notForMe": [8, 19, 22, ...]
  },
  "phase2Data": {
    "scenarios": [
      {
        "scenarioId": 1,
        "primaryChoice": "a",
        "followUpChoice": "a3",
        "trait": "analytical"
      }
    ]
  }
}
```

**Response:**
```json
{
  "profile": {
    "narrative": "Personalized 200-word summary...",
    "topThemes": [...],
    "recommendedClusters": [...]
  }
}
```

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard:**
   - `OPENAI_API_KEY`

4. **Production deployment:**
   ```bash
   vercel --prod
   ```

### Environment Variables for Production
Make sure to set these in your Vercel project settings:
- `OPENAI_API_KEY` - Your OpenAI API key

## Customization

### Adding New Interest Cards
Edit `lib/data.ts` and add to the `interestCards` array:
```typescript
{
  id: 26,
  emoji: '🎬',
  label: 'Filmmaking',
  category: 'artistic'
}
```

### Adding New Scenarios
Edit `lib/data.ts` and add to the `scenarios` array with the same structure.

### Changing Colors
Edit `tailwind.config.js` to modify the color palette:
```javascript
colors: {
  'yellow-primary': '#FFF100',
  'blue-primary': '#006BFF',
  // ... etc
}
```

## Performance Targets

- Initial page load: < 2 seconds
- Phase transitions: < 300ms
- AI profile generation: < 10 seconds
- PDF generation: < 5 seconds

## Accessibility

- WCAG 2.1 AA compliant
- Full keyboard navigation support
- Screen reader friendly
- Proper ARIA labels and roles
- High contrast ratios (4.5:1 minimum)
- Focus indicators on all interactive elements

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari iOS 14+
- Chrome Mobile Android 90+

## License

This project is proprietary to Ascend Now Career Exploration Platform.

## Support

For issues or questions, please contact the development team.

## Credits

- **Design Framework:** MDA (Mechanics, Dynamics, Aesthetics)
- **Student Language Framework:** BMAD (Build, Measure, Analyze, Decide)
- **UI Inspiration:** Duolingo
- **Career Framework:** 16 Career Clusters
- **AI Integration:** OpenAI GPT-4
