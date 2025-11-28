import { InterestCard, Scenario } from './types';

export const interestCards: InterestCard[] = [
  { id: 1, emoji: '🎨', label: 'Creating Art', category: 'creative' },
  { id: 2, emoji: '🔬', label: 'Science Experiments', category: 'investigative' },
  { id: 3, emoji: '💻', label: 'Coding & Programming', category: 'realistic' },
  { id: 4, emoji: '🎭', label: 'Performing on Stage', category: 'artistic' },
  { id: 5, emoji: '🏗️', label: 'Building Things', category: 'realistic' },
  { id: 6, emoji: '🤝', label: 'Helping Others', category: 'social' },
  { id: 7, emoji: '📊', label: 'Analyzing Data', category: 'investigative' },
  { id: 8, emoji: '🎮', label: 'Playing Video Games', category: 'artistic' },
  { id: 9, emoji: '📝', label: 'Writing Stories', category: 'artistic' },
  { id: 10, emoji: '🧩', label: 'Solving Puzzles', category: 'investigative' },
  { id: 11, emoji: '🎵', label: 'Making Music', category: 'artistic' },
  { id: 12, emoji: '💼', label: 'Leading a Team', category: 'enterprising' },
  { id: 13, emoji: '🌱', label: 'Gardening & Plants', category: 'realistic' },
  { id: 14, emoji: '🎯', label: 'Organizing Projects', category: 'conventional' },
  { id: 15, emoji: '🔧', label: 'Fixing Things', category: 'realistic' },
  { id: 16, emoji: '📸', label: 'Photography', category: 'artistic' },
  { id: 17, emoji: '👥', label: 'Meeting New People', category: 'social' },
  { id: 18, emoji: '🧪', label: 'Chemistry & Labs', category: 'investigative' },
  { id: 19, emoji: '💰', label: 'Managing Money', category: 'conventional' },
  { id: 20, emoji: '🏃', label: 'Sports & Fitness', category: 'realistic' },
  { id: 21, emoji: '📚', label: 'Reading & Learning', category: 'investigative' },
  { id: 22, emoji: '🎤', label: 'Public Speaking', category: 'enterprising' },
  { id: 23, emoji: '🧑‍🏫', label: 'Teaching Others', category: 'social' },
  { id: 24, emoji: '📐', label: 'Math & Logic', category: 'investigative' },
  { id: 25, emoji: '🌍', label: 'Traveling & Exploring', category: 'enterprising' }
];

export const scenarios: Scenario[] = [
  {
    id: 1,
    prompt: "🎬 Imagine: It's a free Saturday afternoon...",
    question: "What sounds MOST appealing to you?",
    options: [
      {
        id: 'a',
        emoji: '🎨',
        text: 'Design a website for a friend\'s project',
        subtext: 'Creative problem-solving that helps someone',
        followUp: {
          question: 'What part of "designing a website" matters MOST to you?',
          options: [
            { id: 'a1', emoji: '⭐', text: 'The creative freedom to make it unique', trait: 'creative-autonomy' },
            { id: 'a2', emoji: '🤝', text: 'Helping someone achieve their goal', trait: 'social-impact' },
            { id: 'a3', emoji: '🧩', text: 'The challenge of problem-solving', trait: 'analytical' },
            { id: 'a4', emoji: '👨‍💻', text: 'Working independently on my own', trait: 'independence' }
          ]
        }
      },
      {
        id: 'b',
        emoji: '🐾',
        text: 'Volunteer at an animal shelter',
        subtext: 'Hands-on care work with immediate impact',
        followUp: {
          question: 'What about volunteering appeals to you most?',
          options: [
            { id: 'b1', emoji: '❤️', text: 'Making a direct difference in lives', trait: 'social-impact' },
            { id: 'b2', emoji: '🤲', text: 'The hands-on, physical work', trait: 'practical' },
            { id: 'b3', emoji: '🏥', text: 'Learning about animal care', trait: 'investigative' },
            { id: 'b4', emoji: '👥', text: 'Working alongside other volunteers', trait: 'collaborative' }
          ]
        }
      },
      {
        id: 'c',
        emoji: '🏆',
        text: 'Enter a coding competition',
        subtext: 'Challenge yourself against others',
        followUp: {
          question: 'What excites you about competition?',
          options: [
            { id: 'c1', emoji: '🥇', text: 'Proving I can win and be the best', trait: 'competitive' },
            { id: 'c2', emoji: '📈', text: 'Pushing myself to learn faster', trait: 'growth-oriented' },
            { id: 'c3', emoji: '🔍', text: 'Solving hard problems under pressure', trait: 'analytical' },
            { id: 'c4', emoji: '✨', text: 'Creating something impressive', trait: 'creative-achievement' }
          ]
        }
      },
      {
        id: 'd',
        emoji: '✍️',
        text: 'Write short stories or create digital art',
        subtext: 'Express yourself through original content',
        followUp: {
          question: 'What matters most in creative work?',
          options: [
            { id: 'd1', emoji: '🎭', text: 'Expressing my feelings and ideas', trait: 'self-expression' },
            { id: 'd2', emoji: '👀', text: 'Sharing my work with others', trait: 'social-recognition' },
            { id: 'd3', emoji: '🌟', text: 'Making something beautiful or original', trait: 'aesthetic' },
            { id: 'd4', emoji: '🔓', text: 'Having complete creative control', trait: 'creative-autonomy' }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    prompt: "🔮 You just discovered a new skill you're good at...",
    question: "What would you want to do next?",
    options: [
      {
        id: 'a',
        emoji: '📚',
        text: 'Study it deeply and become an expert',
        subtext: 'Master every detail',
        followUp: {
          question: 'Why does mastery appeal to you?',
          options: [
            { id: 'a1', emoji: '🧠', text: 'I love understanding how things work', trait: 'investigative' },
            { id: 'a2', emoji: '🎯', text: 'Being the best at something feels amazing', trait: 'achievement' },
            { id: 'a3', emoji: '🔬', text: 'Deep knowledge opens new possibilities', trait: 'exploratory' },
            { id: 'a4', emoji: '📖', text: 'I enjoy the learning process itself', trait: 'learning-oriented' }
          ]
        }
      },
      {
        id: 'b',
        emoji: '🧑‍🏫',
        text: 'Teach it to others right away',
        subtext: 'Share what you learned',
        followUp: {
          question: 'What excites you about teaching?',
          options: [
            { id: 'b1', emoji: '💡', text: 'Seeing others have "aha!" moments', trait: 'social-impact' },
            { id: 'b2', emoji: '👥', text: 'Building connections through sharing', trait: 'social-connection' },
            { id: 'b3', emoji: '🗣️', text: 'Improving my communication skills', trait: 'communication' },
            { id: 'b4', emoji: '🏅', text: 'Being recognized as helpful', trait: 'social-recognition' }
          ]
        }
      },
      {
        id: 'c',
        emoji: '🚀',
        text: 'Use it to start a project or business',
        subtext: 'Turn it into something real',
        followUp: {
          question: 'What appeals most about creating something?',
          options: [
            { id: 'c1', emoji: '💰', text: 'The potential to make money', trait: 'enterprising' },
            { id: 'c2', emoji: '🌍', text: 'Making an impact on the world', trait: 'social-impact' },
            { id: 'c3', emoji: '🎨', text: 'Building something that\'s uniquely mine', trait: 'creative-autonomy' },
            { id: 'c4', emoji: '📊', text: 'The challenge of making it succeed', trait: 'strategic' }
          ]
        }
      },
      {
        id: 'd',
        emoji: '🤸',
        text: 'Practice it just for fun',
        subtext: 'Enjoy it without pressure',
        followUp: {
          question: 'What makes something fun for you?',
          options: [
            { id: 'd1', emoji: '😊', text: 'When there\'s no stress or expectations', trait: 'stress-free' },
            { id: 'd2', emoji: '🎮', text: 'When I can explore freely', trait: 'exploratory' },
            { id: 'd3', emoji: '🌈', text: 'When I feel relaxed and creative', trait: 'creative-flow' },
            { id: 'd4', emoji: '⚡', text: 'When it energizes me naturally', trait: 'intrinsic-motivation' }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    prompt: "🎓 You're working on a big school project...",
    question: "What role do you naturally take?",
    options: [
      {
        id: 'a',
        emoji: '📋',
        text: 'The organizer who keeps everyone on track',
        subtext: 'Make sure nothing falls through the cracks',
        followUp: {
          question: 'What do you enjoy about organizing?',
          options: [
            { id: 'a1', emoji: '✅', text: 'Seeing everything come together perfectly', trait: 'conventional' },
            { id: 'a2', emoji: '🎯', text: 'Making sure we achieve our goal', trait: 'goal-oriented' },
            { id: 'a3', emoji: '🤝', text: 'Helping the team work smoothly', trait: 'supportive' },
            { id: 'a4', emoji: '🧩', text: 'Creating efficient systems', trait: 'systematic' }
          ]
        }
      },
      {
        id: 'b',
        emoji: '💡',
        text: 'The idea generator who sparks creativity',
        subtext: 'Come up with unique approaches',
        followUp: {
          question: 'Why do you love generating ideas?',
          options: [
            { id: 'b1', emoji: '🌟', text: 'I love thinking outside the box', trait: 'innovative' },
            { id: 'b2', emoji: '🎨', text: 'Creativity feels natural to me', trait: 'artistic' },
            { id: 'b3', emoji: '🚀', text: 'New ideas can change everything', trait: 'visionary' },
            { id: 'b4', emoji: '🧠', text: 'I enjoy connecting different concepts', trait: 'synthesizing' }
          ]
        }
      },
      {
        id: 'c',
        emoji: '🔨',
        text: 'The builder who makes things happen',
        subtext: 'Get hands-on with the actual work',
        followUp: {
          question: 'What do you love about doing?',
          options: [
            { id: 'c1', emoji: '👷', text: 'I prefer action over just planning', trait: 'practical' },
            { id: 'c2', emoji: '🏗️', text: 'Seeing tangible results motivates me', trait: 'results-oriented' },
            { id: 'c3', emoji: '🛠️', text: 'I enjoy figuring out how to build things', trait: 'realistic' },
            { id: 'c4', emoji: '💪', text: 'Physical or hands-on work is satisfying', trait: 'kinesthetic' }
          ]
        }
      },
      {
        id: 'd',
        emoji: '🔍',
        text: 'The researcher who digs deep into details',
        subtext: 'Find the best information and insights',
        followUp: {
          question: 'What draws you to research?',
          options: [
            { id: 'd1', emoji: '📚', text: 'I love discovering new knowledge', trait: 'investigative' },
            { id: 'd2', emoji: '🧪', text: 'Finding accurate answers matters', trait: 'detail-oriented' },
            { id: 'd3', emoji: '🤔', text: 'Understanding "why" is important', trait: 'analytical' },
            { id: 'd4', emoji: '🎓', text: 'Being the expert feels rewarding', trait: 'mastery-oriented' }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    prompt: "⚡ You have extra time after school...",
    question: "What would you naturally do?",
    options: [
      {
        id: 'a',
        emoji: '🏃',
        text: 'Play sports or get physically active',
        subtext: 'Move your body and compete',
        followUp: {
          question: 'What do you love about physical activity?',
          options: [
            { id: 'a1', emoji: '💪', text: 'The challenge of improving', trait: 'growth-oriented' },
            { id: 'a2', emoji: '👥', text: 'Being part of a team', trait: 'social-connection' },
            { id: 'a3', emoji: '🏆', text: 'The thrill of competition', trait: 'competitive' },
            { id: 'a4', emoji: '😌', text: 'It clears my mind and energizes me', trait: 'wellness-oriented' }
          ]
        }
      },
      {
        id: 'b',
        emoji: '📱',
        text: 'Hang out with friends online or in person',
        subtext: 'Connect and have fun socially',
        followUp: {
          question: 'What makes social time meaningful?',
          options: [
            { id: 'b1', emoji: '😂', text: 'Laughing and having fun together', trait: 'social-enjoyment' },
            { id: 'b2', emoji: '💬', text: 'Deep conversations and sharing ideas', trait: 'communication' },
            { id: 'b3', emoji: '🤗', text: 'Feeling close and connected', trait: 'social-connection' },
            { id: 'b4', emoji: '🎉', text: 'Trying new experiences together', trait: 'exploratory-social' }
          ]
        }
      },
      {
        id: 'c',
        emoji: '🎨',
        text: 'Work on a personal creative project',
        subtext: 'Make something you\'ve been imagining',
        followUp: {
          question: 'What drives your creative projects?',
          options: [
            { id: 'c1', emoji: '✨', text: 'Bringing my vision to life', trait: 'artistic' },
            { id: 'c2', emoji: '🎯', text: 'Improving my skills step by step', trait: 'skill-building' },
            { id: 'c3', emoji: '🌟', text: 'Expressing something personal', trait: 'self-expression' },
            { id: 'c4', emoji: '🏅', text: 'Creating something impressive', trait: 'achievement' }
          ]
        }
      },
      {
        id: 'd',
        emoji: '🧘',
        text: 'Relax with music, books, or solo time',
        subtext: 'Recharge in your own way',
        followUp: {
          question: 'What does downtime give you?',
          options: [
            { id: 'd1', emoji: '🔋', text: 'Energy to tackle what\'s next', trait: 'introverted-recharge' },
            { id: 'd2', emoji: '🧠', text: 'Space to think and reflect', trait: 'reflective' },
            { id: 'd3', emoji: '😌', text: 'Peace and relaxation', trait: 'wellness-oriented' },
            { id: 'd4', emoji: '💭', text: 'Freedom to explore my own interests', trait: 'independent' }
          ]
        }
      }
    ]
  }
];

export const careerClusters = [
  'Agriculture, Food & Natural Resources',
  'Architecture & Construction',
  'Arts, A/V Technology & Communications',
  'Business Management & Administration',
  'Education & Training',
  'Finance',
  'Government & Public Administration',
  'Health Science',
  'Hospitality & Tourism',
  'Human Services',
  'Information Technology',
  'Law, Public Safety, Corrections & Security',
  'Manufacturing',
  'Marketing',
  'STEM (Science, Technology, Engineering & Mathematics)',
  'Transportation, Distribution & Logistics'
];
