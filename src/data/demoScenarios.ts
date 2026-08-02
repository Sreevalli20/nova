import { DemoScenario } from '../types';

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'student-ai',
    name: 'Engineering Student',
    role: 'University Student',
    tagline: 'Aspiring AI Specialist seeking clear direction',
    iconName: 'GraduationCap',
    prompt: {
      situation: 'I am a 3rd-year computer science & engineering student with basic Python skills.',
      goals: 'Master AI/ML engineering, build real portfolio projects, and secure a top tier AI internship in 6 months.',
      habits: 'Study 2 hours randomly, watch tech tutorials on YouTube without building, sleep at 2 AM.',
      problems: 'Overwhelmed by too many frameworks, tutorials, and math prerequisites. I lack a structured roadmap.',
      challenges: 'No proof of work projects, fear of missing out, low consistency due to exam pressure.'
    },
    sampleVisionTitle: 'Exam Question / Code Bug',
    sampleVisionImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'tech-founder',
    name: 'Startup Founder',
    role: 'SaaS CEO',
    tagline: 'Predicting & stopping customer churn before revenue collapse',
    iconName: 'Building2',
    prompt: {
      situation: 'Founder of a B2B SaaS startup with 120 paying customer accounts.',
      goals: 'Reach $50k MRR, stabilize customer churn below 2%, and launch AI automation features.',
      habits: 'Reactive bug fixing, working 14 hours a day, skipping customer onboarding calls.',
      problems: 'User churn increased from 3% to 9% over 60 days. Team burn rate is high.',
      challenges: 'Feature bloat, customer complaints about onboarding complexity, competitor low pricing.'
    },
    sampleVisionTitle: 'Churn Analytics Dashboard',
    sampleVisionImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'career-pivot',
    name: 'Career Pivot',
    role: 'Project Manager',
    tagline: 'Mitigating career stagnation & future-proofing role',
    iconName: 'Briefcase',
    prompt: {
      situation: 'Senior operations project manager with 7 years experience in retail logistics.',
      goals: 'Transition into AI Product Manager role within 90 days with 35% salary increase.',
      habits: 'Listen to AI podcasts during commute, update LinkedIn monthly, manual sprint tracking.',
      problems: 'No formal technical coding background, resume filtered out by ATS algorithms.',
      challenges: 'Imposter syndrome regarding AI technical architecture, limited time due to full-time job.'
    },
    sampleVisionTitle: 'System Architecture Diagram',
    sampleVisionImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'agri-farmer',
    name: 'Agritech Specialist',
    role: 'Smart Farmer',
    tagline: 'Preventing crop disease & yield loss before harvest',
    iconName: 'Sprout',
    prompt: {
      situation: 'Managing 150 hectares of organic crop agriculture.',
      goals: 'Maximize yield harvest by 25%, reduce soil pesticide reliance, prevent mold infestation.',
      habits: 'Visual field checks twice weekly, weather monitoring via basic news apps.',
      problems: 'Unpredictable rain patterns leading to early root moisture stress and yellow leaves.',
      challenges: 'Delayed pest identification resulting in 15% crop loss last season.'
    },
    sampleVisionTitle: 'Crop Leaf Disease Sample',
    sampleVisionImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'health-wellness',
    name: 'High Performer',
    role: 'Executive',
    tagline: 'Preventing burnout & chronic fatigue breakdown',
    iconName: 'Activity',
    prompt: {
      situation: 'Product Vice President managing international cross-time zone teams.',
      goals: 'Maintain peak executive focus, optimize sleep quality, reduce resting heart rate.',
      habits: '3 cups of coffee after 3 PM, checking emails at 11 PM, skipping workouts 4 days a week.',
      problems: 'Afternoon brain fog, severe sleep fragmentation (5.5 hrs avg), elevated stress levels.',
      challenges: 'High-stakes client pressure, zero downtime, chronic physical tension.'
    },
    sampleVisionTitle: 'Biometric Wearables Data Chart',
    sampleVisionImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80'
  }
];
