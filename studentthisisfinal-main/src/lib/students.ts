export interface Student {
  id: number;
  name: string;
  university: string;
  classYear: string;
  major: string;
  bio: string;
  accomplishments: string[];
  initials: string;
  // Use a full external URL or a Base64 Data URI string.
  photo?: string; 
}

export const students: Student[] = [
  {
    id: 1,
    name: "Sean Lee",
    university: "UCLA",
    classYear: "2027",
    major: "Computer Science and Linguistics",
    bio: "I'm a CS and Linguistics student at UCLA. I focus on practical AI systems and workflows for school and research. I founded StudentStack to make high-signal AI guidance more accessible to families.",
    accomplishments: [
      "Kleiner Perkins Engineering Fellow",
      "Incoming Software Engineer at Amazon (AWS)",
      "USACO Platinum Medalist",
      "Built AI study systems used by 500+ students"
    ],
    initials: "SL"
  },
  {
    id: 2,
    name: "Daniel Zhang",
    university: "MIT",
    classYear: "2027",
    major: "Electrical Engineering and CS",
    bio: "I'm an EE/CS major at MIT with a focus on robotics and hardware systems. I spend most of my time in the lab building combat robots and researching biomechatronics. I'm here to help students who want to move beyond basic coding and into serious hardware and systems engineering.",
    accomplishments: [
      "Hardware Engineering Intern at Boston Dynamics",
      "Undergraduate Researcher at MIT Media Lab",
      "Lead Engineer for MIT's Battlebots Team",
      "National Merit Scholar"
    ],
    initials: "DZ",
    photo: "https://i.postimg.cc/yxc3tZvL/Gemini-Generated-Image-bpfi9lbpfi9lbpfi.png",
  },
  {
    id: 3,
    name: "Aditya Deshpandhi",
    university: "Harvard",
    classYear: "2028",
    major: "Premed and Neuroscience",
    bio: "I'm a Neuroscience student at Harvard on the premed track. My work involves neuro-geriatrics research at Mass General Hospital. I help students navigate the competitive premed landscape, from securing research fellowships to managing the academic rigors of a science-heavy curriculum.",
    accomplishments: [
      "Research Fellow at Mass General Hospital",
      "Co-author in Journal of Neuroscience",
      "Coca-Cola Scholar",
      "Harvard Pre-Medical Society Board Member"
    ],
    initials: "AD",
    photo: "https://i.postimg.cc/1RkpB9JB/Gemini-Generated-Image-s7dek9s7dek9s7de.png",
  },
  {
    id: 4,
    name: "Tyler Yoo",
    university: "Princeton",
    classYear: "2028",
    major: "Economics and Finance",
    bio: "I study Economics and Finance at Princeton. I manage a portion of a student-run investment fund and have experience in quantitative research. My goal is to help students understand the technical side of finance and prepare for roles at top-tier firms like Goldman Sachs.",
    accomplishments: [
      "Incoming IB Analyst at Goldman Sachs",
      "Quantitative Research Intern at Point72",
      "Portfolio Manager, Tiger Investments ($2M AUM)",
      "Princeton Finance Association Member"
    ],
    initials: "TY",
    photo: "https://i.postimg.cc/c4GnYFLh/Gemini-Generated-Image-6jb0xv6jb0xv6jb0.png",
  },
  {
    id: 5,
    name: "Isaac Kim",
    university: "Princeton",
    classYear: "2027",
    major: "Biology",
    bio: "I'm a Biology major at Princeton and a certified EMT. I balance clinical research at the Bassler Lab with hands-on emergency medical service. I provide realistic guidance for students interested in the intersection of biological research and clinical practice.",
    accomplishments: [
      "Clinical Researcher at Bassler Lab",
      "Certified EMT-B (500+ clinical hours)",
      "Presidential Scholar",
      "Princeton First Aid & Rescue Squad Member"
    ],
    initials: "IK",
    photo: "https://i.postimg.cc/xTZymfMk/Gemini-Generated-Image-7i3t77i3t77i3t77.png",
  },
  {
    id: 6,
    name: "Emily Chen",
    university: "Stanford",
    classYear: "2026",
    major: "Philosophy and Political Science",
    bio: "I'm a Philosophy and Political Science major at Stanford. My academic focus is on technology policy and digital ethics. I lead the Undergraduate Law Review and compete in national debate, helping students develop the critical thinking and writing skills necessary for top-tier humanities programs.",
    accomplishments: [
      "Policy Fellow at Electronic Frontier Foundation",
      "Editor-in-Chief of Stanford Undergraduate Law Review",
      "National Debate Tournament (NDT) Qualifier",
      "Stanford Ethics in Society Honors Program"
    ],
    initials: "EC",
    photo: "https://i.postimg.cc/NfRRPWnK/Gemini-Generated-Image-7so6n87so6n87so6.png",
  },
  {
    id: 7,
    name: "Layla Hume",
    university: "Columbia",
    classYear: "2027",
    major: "Art History and English",
    bio: "I study Art History and English at Columbia. I've interned at The Met and manage editorial work for the Columbia Journal. I help students who are passionate about the humanities build impressive portfolios and navigate the world of fine arts and publishing.",
    accomplishments: [
      "Digital Archives Intern at The Metropolitan Museum of Art",
      "Managing Editor for The Columbia Journal",
      "Sotheby’s Institute of Art Summer Scholar",
      "Columbia University Arts Initiative Member"
    ],
    initials: "LH",
  },
  {
    id: 8,
    name: "Tyler Wimberly",
    university: "UCLA",
    classYear: "2028",
    major: "Business Economics",
    bio: "I'm a Business Economics major at UCLA. I've built and scaled a startup to $18k MRR and now work with the Dorm Room Fund to support other student founders. I help students who want to start their own ventures while maintaining their academic standing.",
    accomplishments: [
      "Venture Partner at Dorm Room Fund",
      "Founder of LocalCrate ($18k MRR)",
      "1st Place, UCLA Knapp Venture Competition",
      "UCLA Anderson Venture Accelerator Resident"
    ],
    initials: "TW",
    photo: "https://i.postimg.cc/0yfD97xn/Gemini-Generated-Image-gw8s1fgw8s1fgw8s.png",
  },
  {
    id: 9,
    name: "Erin Park",
    university: "Stanford",
    classYear: "2027",
    major: "Chemistry",
    bio: "I'm a Chemistry major at Stanford. My research focuses on chemical biology and developing tools for cellular study. I help students tackle advanced science subjects and find their way into high-level undergraduate research labs.",
    accomplishments: [
      "Intel Science Talent Search Finalist",
      "Undergraduate Researcher at Stanford ChEM-H",
      "Chemistry Olympiad Gold Medalist",
      "Stanford Chemistry Peer Advisor"
    ],
    initials: "EP",
  },
  {
    id: 10,
    name: "Nick Pavlosky",
    university: "Caltech",
    classYear: "2028",
    major: "Physics and Machine Learning",
    bio: "I study Physics and Machine Learning at Caltech. My background includes research at CERN and leading the Caltech AI Society. I help students interested in the fundamental sciences and the technical implementation of AI.",
    accomplishments: [
      "Researcher at CERN (ATLAS Experiment)",
      "President of Caltech AI Society",
      "IOAA Gold Medalist",
      "Caltech Summer Undergraduate Research Fellow (SURF)"
    ],
    initials: "NP",
  },
  {
    id: 11,
    name: "Derek Wang",
    university: "UC Berkeley",
    classYear: "2028",
    major: "EECS",
    bio: "I'm an EECS major at UC Berkeley. I've interned at Google and built AI study tools used by thousands of students. I focus on helping students develop the software engineering skills needed for both industry roles and independent product development.",
    accomplishments: [
      "Software Engineering Intern at Google",
      "Researcher at Berkeley AI Research (BAIR)",
      "Built an AI-powered study tool with 10k+ active users",
      "UC Berkeley Regents' and Chancellor's Scholar"
    ],
    initials: "DW",
  },
  {
    id: 12,
    name: "Ethan Lin",
    university: "Yale",
    classYear: "2027",
    major: "Mathematics",
    bio: "I'm a Mathematics major at Yale. I combine my interest in network science with my background as a cellist. I help students who want to excel in competitive mathematics while maintaining a high level of achievement in the arts.",
    accomplishments: [
      "Principal Cellist for the Yale Symphony Orchestra",
      "Researcher at the Yale Institute for Network Science",
      "AIME Qualifier and National Merit Scholar",
      "Yale Mathematics Society Member"
    ],
    initials: "EL",
  },
];