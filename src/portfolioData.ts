const deviconBase = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const simpleIconBase = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "youtube" | "drive" | "external";
};

export type ProjectDetails = {
  problem: string;
  built: string;
  approach: string;
  role: string;
  impact: string;
};

export type Project = {
  title: string;
  date: string;
  category: string;
  text: string;
  bullets: string[];
  tags: string[];
  details?: ProjectDetails;
  image?: string;
  gallery?: string[];
  links?: ProjectLink[];
};

export type WorkExperience = {
  title: string;
  company: string;
  location: string;
  date: string;
  text: string;
  bullets: string[];
  tags: string[];
  sourceNote?: string;
};

export type SelectedExperience = WorkExperience & {
  logo?: string;
  logoAlt?: string;
  initials: string;
  accent: string;
  signal: string;
  visualLabel: string;
  sourceUrl?: string;
};

export type SkillItem = {
  name: string;
  logo?: string;
  mark?: string;
};

export type SkillCategory = {
  title: string;
  signal: string;
  accent: string;
  summary: string;
  skills: SkillItem[];
};

export type EducationItem = {
  school: string;
  credential: string;
  date: string;
  initials: string;
  accent: string;
  logo?: string;
};

export const profile = {
  name: "Geoffrey Lazer",
  initials: "GL",
  role: "AI/ML Engineer | XR Developer | Full-Stack Developer",
  location: "Edmonton, Alberta, Canada",
  email: "allenlazer9@gmail.com",
  portrait: "/geoffrey-lazer-profile.webp",
  linkedin: "https://www.linkedin.com/in/geoffrey-lazer-09b0901b2/",
  github: "https://github.com/GeoffreyLazer",
  portfolio: "https://geoff-portfolio-github-io.vercel.app/",
  intro:
    "Computing Science graduate student at the University of Alberta, focused on applied AI/ML, XR, and full-stack systems.",
  signature:
    "I build ML workflows, immersive interfaces, and web systems that turn complex research ideas into usable software.",
};

export const stats = [
  { value: "AI/ML", label: "Modeling, LSTM, RAG, CV" },
  { value: "XR", label: "Unity, OpenXR, 3D interaction" },
  { value: "SWE", label: "React, APIs, data systems" },
];

export const selectedExperience: SelectedExperience[] = [
  {
    title: "XR Research Developer",
    company: "University of Alberta",
    location: "Edmonton, AB",
    date: "2026 – Present",
    text: "Developing immersive civil-engineering research platforms for construction safety and ergonomics.",
    bullets: [
      "Designed and developed a controlled OpenXR formwork-safety experiment with audio-only truck/load hazards, timed interactions, and CSV trial analytics.",
      "Built a passthrough MR ergonomics workspace with synchronized video, joint/mesh motion visualization, risk scoring, and original-versus-optimized comparison.",
      "Validated both Quest 3 applications near 72 FPS and created modular integration boundaries for researcher-provided RL and rule-based models.",
    ],
    tags: ["Unity", "C#", "OpenXR", "Meta Quest 3", "Mixed Reality", "XR Interaction", "CSV Analytics"],
    logo: "/education-logos/ualberta.svg",
    logoAlt: "University of Alberta logo",
    initials: "UA",
    accent: "#7cff9d",
    signal: "XR R&D",
    visualLabel: "Civil engineering XR research",
    sourceNote: "Confirm the official role title and start month before final resume use.",
  },
  {
    title: "Machine Learning Engineer",
    company: "FireSafe AI",
    location: "Edmonton, AB",
    date: "Oct 2025 – Mar 2026",
    text: "Built ML workflows for wildfire risk and rate-of-spread prediction.",
    bullets: [
      "Building machine learning models for wildfire risk and rate-of-spread prediction using spatiotemporal datasets.",
      "Working with sequence/time-series modelling (LSTM) and data engineering workflows for large-scale training/evaluation.",
      "Collaborating with applied researchers to translate model outputs into decision-support tools.",
    ],
    tags: ["Python", "LSTM", "Time Series", "Data Pipelines", "Model Evaluation"],
    logo: "https://firesafe.live/wp-content/uploads/2024/08/FireSafe_Logo_Secondary_Black.png",
    logoAlt: "FireSafe AI logo",
    initials: "FS",
    accent: "#ff7a45",
    signal: "Applied ML",
    visualLabel: "Wildfire ML + R&D",
    sourceUrl: "https://firesafe.live/about/",
  },
  {
    title: "Software Developer Intern",
    company: "Luxsonic Technologies",
    location: "Saskatoon, Saskatchewan",
    date: "May 2025 – Aug 2025",
    text: "Built Unity/XR tooling for real-time medical visualization workflows.",
    bullets: [
      "Developed Unity volumetric rendering workflows for medical datasets and interactive slicing.",
      "Explored DICOM, Dicom2Mesh, C++, and VTK pipelines for medical mesh extraction.",
      "Optimized volumetric medical data toward lighter real-time rendering paths for Unity environments.",
      "Worked across XR interaction, medical imaging workflows, and Linux-based visualization tooling.",
    ],
    tags: ["Unity", "C#", "OpenXR", "DICOM", "VTK", "Mesh Processing"],
    logo: "/organization-logos/luxsonic.webp",
    logoAlt: "Luxsonic Technologies logo",
    initials: "LX",
    accent: "#19e6ff",
    signal: "XR Software",
    visualLabel: "Healthcare XR systems",
    sourceUrl: "https://luxsonic.ca/about-us/",
  },
  {
    title: "Graduate Teaching Assistant",
    company: "University of Alberta",
    location: "Edmonton, Alberta",
    date: "Jan 2025 – Apr 2025",
    text: "Supported CMPUT 402 Software Quality, helping students reason about reliable production software practices.",
    bullets: [
      "Guided students through CI/CD, automated testing, and DevOps concepts.",
      "Reviewed software quality concerns around technical debt, test design, and maintainability.",
      "Supported senior-course delivery with practical engineering feedback and mentorship.",
    ],
    tags: ["CI/CD", "Automated Testing", "GitHub Actions", "Software Quality", "DevOps"],
    logo: "https://www.ualberta.ca/favicon.ico",
    logoAlt: "University of Alberta logo",
    initials: "UA",
    accent: "#ffcf3f",
    signal: "Software Quality",
    visualLabel: "Research university teaching",
    sourceUrl: "https://www.ualberta.ca/en/toolkit/index.html",
  },
  {
    title: "AI/ML Researcher",
    company: "MedWatch Technologies",
    location: "Edmonton, Alberta",
    date: "Oct 2024 – Dec 2024",
    text: "Researched optical sensor data modeling and glucose prediction experiments for metabolic health technology.",
    bullets: [
      "Built sequence preprocessing and LSTM regression workflows for optical sensor data.",
      "Developed DQN experiments for glucose prediction support and device-configuration tuning.",
      "Compared reinforcement-learning behavior against an LSTM baseline with evaluation-metric tracking.",
      "Documented model behavior and deployment architecture for medical AI development discussions.",
    ],
    tags: ["Python", "PyTorch", "TensorFlow", "LSTM", "Model Evaluation"],
    logo: "https://medwatchtech.com/wp-content/uploads/2023/07/MWT-300x50.jpg",
    logoAlt: "MedWatch Technologies logo",
    initials: "MW",
    accent: "#7cff9d",
    signal: "Medical AI",
    visualLabel: "Biosensing + AI",
    sourceUrl: "https://medwatchtech.com/",
  },
  {
    title: "Web Development Intern",
    company: "Spacescan",
    location: "Canada",
    date: "Sep 2022 – Feb 2023",
    text: "Worked on web application development for data-driven product interfaces.",
    bullets: [
      "Built and improved frontend/backend features for web application workflows.",
      "Worked with data-driven interfaces where UI clarity mattered for technical users.",
      "Fixed bugs and refined interface behavior across production-facing web surfaces.",
    ],
    tags: ["React", "JavaScript", "REST APIs", "Frontend", "Data Interfaces"],
    logo: "/organization-logos/spacescan.webp",
    logoAlt: "SpaceScan logo",
    initials: "SS",
    accent: "#ff4fd8",
    signal: "Geo-AI Web",
    visualLabel: "Geospatial software",
    sourceUrl: "https://spacescan.in/",
  },
];

export const workExperience: WorkExperience[] = [
  {
    title: "XR Research Developer",
    company: "University of Alberta",
    location: "Edmonton, AB",
    date: "2026 – Present",
    text: "Developing immersive civil-engineering research platforms for construction safety and ergonomics.",
    bullets: [
      "Designed and developed an OpenXR formwork-safety experiment with audio-first hazards, timed interactions, and CSV trial analytics.",
      "Built a passthrough MR ergonomics workspace with synchronized video, joint/mesh visualization, risk scoring, and movement comparison.",
      "Validated both Quest 3 applications near 72 FPS and prepared modular boundaries for researcher-provided models.",
    ],
    tags: ["Unity", "C#", "OpenXR", "Meta Quest 3", "Mixed Reality", "XR Interaction", "CSV Analytics"],
    sourceNote: "Confirm the official role title and start month before final resume use.",
  },
  {
    title: "Machine Learning Engineer",
    company: "FireSafe AI",
    location: "Edmonton, AB",
    date: "Oct 2025 – Mar 2026",
    text: "Built ML workflows for wildfire risk and rate-of-spread prediction.",
    bullets: [
      "Building machine learning models for wildfire risk and rate-of-spread prediction using spatiotemporal datasets.",
      "Working with sequence/time-series modelling (LSTM) and data engineering workflows for large-scale training/evaluation.",
      "Collaborating with applied researchers to translate model outputs into decision-support tools.",
    ],
    tags: ["Python", "LSTM", "Time Series", "Data Pipelines", "Model Evaluation"],
  },
  {
    title: "Software Developer Internship",
    company: "Luxsonic Technologies Inc.",
    location: "Saskatoon, Saskatchewan, Canada",
    date: "May 2025 - Aug 2025",
    text: "Built medical-imaging interaction systems for real-time Unity and VR environments.",
    bullets: [
      "Developed 3D volumetric visualization of DICOM data in Unity for real-time slicing and transfer functions.",
      "Built a gesture-based VR keyboard with OpenXR for efficient text input in immersive environments.",
      "Integrated offline voice-to-text with Vosk for real-time VR transcription and multimodal input.",
      "Explored mesh extraction pipelines using Dicom2Mesh, C++, and VTK to optimize medical imaging for lightweight rendering.",
    ],
    tags: ["Unity", "C#", "OpenXR", "DICOM", "VTK", "Mesh Processing"],
  },
  {
    title: "Graduate Teaching Assistant",
    company: "University of Alberta",
    location: "Edmonton",
    date: "Jan 2025 - Apr 2025",
    text: "Supported CMPUT 402, a senior software engineering course focused on software quality, DevOps, and automation.",
    bullets: [
      "Guided students in building CI/CD pipelines with GitHub Actions.",
      "Supported JUnit testing, SonarQube static analysis, Pitest mutation testing, and code coverage tooling.",
      "Mentored teams on automated deployment, feature toggles, and A/B testing.",
      "Reviewed projects for technical debt, security, and performance considerations.",
      "Collaborated closely with students and instructors, strengthening communication and mentorship skills.",
    ],
    tags: ["DevOps", "GitHub Actions", "JUnit", "SonarQube", "Pitest", "Mentorship"],
  },
  {
    title: "AI/ML Researcher",
    company: "MedWatch Technologies, Inc.",
    location: "Edmonton, Alberta, Canada",
    date: "Oct 2024 - Dec 2024",
    text: "Researched optical sensor data modeling and glucose prediction experiments.",
    bullets: [
      "Built sequence preprocessing and LSTM regression workflows for optical sensor data.",
      "Developed DQN experiments for glucose prediction support and device-configuration tuning.",
      "Compared reinforcement-learning behavior against an LSTM baseline with evaluation-metric tracking.",
      "Documented model behavior and deployment architecture for medical AI development discussions.",
    ],
    tags: ["Python", "PyTorch", "TensorFlow", "LSTM", "Model Evaluation"],
  },
  {
    title: "Head of Design",
    company: "TechCzar",
    location: "Chennai",
    date: "Jul 2023 - Sep 2023",
    text: "Led design work for departmental publishing and creative operations.",
    bullets: [
      "Led the design team and assigned roles to each team member.",
      "Designed the bi-annual magazine for the department.",
      "Managed proofreading and editing responsibilities for publication quality.",
    ],
    tags: ["Design Leadership", "Editorial Design", "Team Management"],
  },
  {
    title: "Intern",
    company: "Spacescan Ltd",
    location: "Canada",
    date: "Sep 2022 - Feb 2023",
    text: "Worked with the front-end team to improve UI quality and site reliability.",
    bullets: [
      "Worked closely with the front-end team to enhance the UI experience and design.",
      "Solved website bugs to ensure the right information was displayed for each NFT.",
    ],
    tags: ["Frontend", "UI", "Bug Fixing", "NFT"],
  },
  {
    title: "Director of Business Development",
    company: "LICET PATTARAI",
    location: "Chennai, Tamil Nadu, India",
    date: "Nov 2021 - Dec 2022",
    text: "Built partnerships and managed club business development for funding, projects, and knowledge-transfer events.",
    bullets: [
      "Collaborated with entrepreneurs and business leaders to obtain funding, industrial projects, and knowledge-transfer sessions.",
      "Managed the club budget to finance events.",
    ],
    tags: ["Business Development", "Partnerships", "Budgeting", "Leadership"],
  },
];

export const projects: Project[] = [
  {
    title: "NFRF Mixed-Reality Ergonomics Platform",
    date: "2026 – Present",
    category: "Mixed-Reality Ergonomics",
    image: "/project-media/nfrf-ergonomics-preview.gif",
    text: "A Meta Quest 3 research platform for reviewing motion, visualizing ergonomic risk, and presenting corrective guidance in mixed reality.",
    bullets: [
      "Synchronized source video, joints, full-body mesh, regional risk scores, and timeline controls through one playback state.",
      "Built a passthrough spatial workspace with controller input, hand interaction, comparison modes, and headset-readable UI.",
      "Passed 81 device checks near 72 FPS; final rule-based geometry and optimization-service integration remains pending.",
    ],
    tags: ["Unity", "C#", "OpenXR", "Meta Quest 3", "Mixed Reality", "Motion Data", "JSON/NPZ", "Spatial UI"],
    details: {
      problem:
        "Video, spreadsheets, and desktop tools make it difficult to compare three-dimensional movement, body-region risk, and corrective guidance in one coherent view.",
      built:
        "A passthrough mixed-reality workspace that synchronizes source video, skeletal joints, full-body mesh rendering, ergonomic scores, body-region highlighting, and original-versus-optimized motion review.",
      approach:
        "Used a single authoritative playback state across video, frame timing, joints, mesh vertices/faces, motion mode, active region, and risk data. Adapter-based integration preserved the existing loaders and XR runtime while adding spatial UI, voice instruction support, and an interface for future rule-based outputs.",
      role:
        "Designed and developed the Unity XR platform, spatial interface, interaction system, synchronized timeline, body visualization modes, Quest deployment workflow, and research integration boundary.",
      impact:
        "Delivered an operational Quest 3 research prototype with 81 passing device checks, performance near 72 FPS, and no runtime exceptions during structured validation. The final geometry adapter and optimization web service remain to be integrated when the research schema is finalized.",
    },
  },
  {
    title: "Formwork Safety VR",
    date: "2026 – Present",
    category: "Construction Safety XR",
    image: "/project-media/formwork-safety-vr-preview.gif",
    text: "A controlled VR experiment for studying how construction workers recognize and respond to acoustic hazard warnings during formwork tasks.",
    bullets: [
      "Built timed two-station trigger/grip formwork interactions and audio-only truck and descending-load hazards.",
      "Implemented six-session trial logic, signed response timing, fail-closed validation, and detailed CSV decision exports.",
      "Launch-tested the Quest 3 release near 72 FPS; the research team's final RL model still needs integration.",
    ],
    tags: ["Unity", "C#", "OpenXR", "Meta Quest 3", "VIVE Focus Vision", "Spatial Audio", "CSV Analytics", "RL Integration"],
    details: {
      problem:
        "The simulation needed to feel like a credible construction site while keeping warning sound as the only initial hazard cue, controlling experimental conditions, and separating participant behavior from technical failure.",
      built:
        "A six-session VR experiment in which participants complete sequential connector and nut actions on pre-installed formwork panels while responding to an approaching truck or descending load through sound-only warnings.",
      approach:
        "Implemented timed trigger and grip mechanics, controlled trial and hazard state, spatial ambience, signed response classification, collision and avoidance outcomes, configurable sessions, and Excel-compatible CSV exports. A ScriptableObject integration layer accepts researcher-provided model decisions and stops visibly when model output is missing or invalid.",
      role:
        "Worked across Unity/C# development, XR interaction, experiment logic, environment and hazard design, spatial UI, audio integration, optimization, CSV validation, Quest/VIVE deployment, documentation, and research handover.",
      impact:
        "Produced a modular Quest 3 research release that passed 184 automated audio-first scenarios and launched near 72 FPS with both Touch Plus controllers detected. Formal participant collection remains pending until the final researcher-provided RL model is integrated.",
    },
  },
  {
    title: "Volume Rendering & 3D Slicing for Medical Imaging",
    date: "Jan 2025 - Apr 2025",
    category: "Medical XR",
    image: "/project-media/volume-rendering-preview.gif",
    text: "An XR medical imaging project focused on mapping and slicing volumetric datasets for diagnosis and procedural planning.",
    bullets: [
      "Performed real-time volume rendering of .nii NIFTI and DICOM medical imaging data in XR.",
      "Built cross-sectional box cutout slicing for inspecting internal structures.",
      "Mapped and visualized 3D datasets to support diagnostic and procedural understanding.",
    ],
    tags: ["Unity", "C#", "XR", "DICOM", "Volumetric Rendering"],
    details: {
      problem:
        "Medical volume datasets are difficult to inspect in ordinary flat viewers, especially when someone needs to understand internal structures spatially.",
      built:
        "A Unity XR prototype for loading volumetric medical imaging data, rendering it in 3D, and slicing through the volume interactively.",
      approach:
        "Combined real-time volume rendering with cross-sectional box cutout controls, NIFTI/DICOM data handling, and XR interaction patterns for spatial inspection.",
      role:
        "Designed and implemented the visualization and interaction pipeline, including the slicing behavior and XR-facing presentation layer.",
      impact:
        "Created a working research prototype that made dense scan data easier to explore spatially for diagnostic and procedural-planning scenarios.",
    },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/GeoffreyLazer/3DMedicalImageVisualization-SlicingonXR.git",
        kind: "github",
      },
      {
        label: "YouTube",
        href: "https://youtu.be/wo76y5mV-r4",
        kind: "youtube",
      },
    ],
  },
  {
    title: "Agricultural Terrain Visualization",
    date: "Sep 2024 - Dec 2024",
    category: "Geospatial XR",
    image: "/project-media/agricultural-terrain-preview.gif",
    text: "A Meta Quest 3 visualization system for agricultural terrain, land plot data, and geospatial navigation.",
    bullets: [
      "Visualized agricultural terrain on Meta Quest 3 using QGIS workflows.",
      "Imported GeoJSON datasets into Unity for immersive viewing.",
      "Displayed geospatial information and implemented automatic pathfinding between land plots.",
    ],
    tags: ["Unity", "C#", "Meta Quest", "QGIS", "GeoJSON"],
    details: {
      problem:
        "Agricultural terrain, land-plot boundaries, and geospatial routes can be hard to understand when they remain locked in flat GIS views.",
      built:
        "A Meta Quest 3 terrain visualization system for immersive exploration of agricultural plots, terrain features, and pathfinding routes.",
      approach:
        "Prepared geospatial data with QGIS, imported GeoJSON into Unity, rendered terrain and land-plot information, and added automatic pathfinding between plots.",
      role:
        "Built the Unity XR scene, geospatial import flow, and interaction logic connecting terrain data to an immersive navigation experience.",
      impact:
        "Produced a recruiter-friendly XR prototype showing how geospatial datasets can become inspectable 3D environments instead of static map layers.",
    },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/GeoffreyLazer/MM806.git",
        kind: "github",
      },
      {
        label: "YouTube",
        href: "https://youtube.com/shorts/IbXerF5edYM?feature=share",
        kind: "youtube",
      },
    ],
  },
  {
    title: "Converting Urban Street Scenes Between Daytime and Nighttime",
    date: "Sep 2024 - Dec 2024",
    category: "Computer Vision",
    image: "/project-media/day-night-preview.gif",
    text: "A CycleGAN image translation project for unpaired day-to-night conversion while preserving core scene semantics.",
    bullets: [
      "Implemented a CycleGAN model for unpaired daytime-to-nighttime image translation.",
      "Focused on preserving essential scene semantics while changing visual domain.",
      "Explored generative computer vision workflows for urban street scenes.",
    ],
    tags: ["PyTorch", "CycleGAN", "Computer Vision", "GAN", "Image Translation"],
    details: {
      problem:
        "Vision systems often struggle when the same scene appears under different lighting domains, and paired day/night training data is hard to collect.",
      built:
        "A CycleGAN-based image translation prototype for converting urban street scenes between daytime and nighttime visual domains.",
      approach:
        "Used unpaired image-to-image translation with cycle-consistency training to shift scene appearance while preserving core visual structure.",
      role:
        "Implemented the model workflow, prepared experiments, and evaluated qualitative scene preservation across translated outputs.",
      impact:
        "Demonstrated a practical generative vision workflow for domain translation where paired supervision is limited or unavailable.",
    },
  },
  {
    title: "Domain Adaptive Learning for Water Body Extraction",
    date: "Sep 2024 - Dec 2024",
    category: "Remote Sensing AI",
    image: "/project-media/domain-water-preview.gif",
    gallery: [
      "/project-media/domain-water-style-transfer-result.webp",
      "/project-media/domain-water-precision-recall.webp",
      "/project-media/domain-water-f1-score.webp",
      "/project-media/domain-water-preprocessing.svg",
      "/project-media/domain-water-architecture.svg",
      "/project-media/domain-water-evaluation.svg",
      "/project-media/domain-water-style-transfer.svg",
    ],
    text: "A remote-sensing AI project for water-body extraction under sensor-domain shift.",
    bullets: [
      "Created 256x256 Sentinel patch workflows for source, target, and mask data.",
      "Explored LU-Net and pix2pix-style domain adaptation across Sentinel-1 and Sentinel-2 imagery.",
      "Evaluated generated water masks against ground-truth patches for extraction quality.",
    ],
    tags: ["PyTorch", "U-Net", "pix2pix", "GAN", "Computer Vision", "Remote Sensing"],
    details: {
      problem:
        "Remote-sensing models can lose reliability when moving between satellite sensors with different imaging characteristics.",
      built:
        "A domain-adaptation prototype for water-body extraction using Sentinel patch preprocessing, lightweight U-Net style segmentation, and sensor-domain translation experiments.",
      approach:
        "Prepared 256x256 satellite patches, modeled source/target consistency with LU-Net style branches, explored pix2pix translation from Sentinel-2 to Sentinel-1 style imagery, and compared generated masks with ground truth.",
      role:
        "Implemented model experiments, preprocessing workflows, and evaluation visuals for the remote-sensing extraction pipeline.",
      impact:
        "Created a focused research prototype for studying how domain adaptation can support water extraction when matched sensor data is limited.",
    },
  },
  {
    title: "Shinyonaika 3D - Self Therapy Game",
    date: "Sep 2023 - May 2024",
    category: "AI Game Development",
    image: "/project-media/shinyonaika-3d-preview.gif",
    text: "A 3D episodic self-therapy game that uses gamified Cognitive Behavioral Therapy scenarios and AI characters.",
    bullets: [
      "Led the team and secured Rs. 100,000 funding.",
      "Gamified Cognitive Behavioral Therapy into real-world episodic 3D scenarios.",
      "Integrated 3D environments, UI, narrative design, and character development.",
      "Integrated Convai API characters for interactive dialogue and prompt-engineered each NPC by role.",
    ],
    tags: ["Unity", "C#", "NPC AI", "API Integration", "3D Interaction"],
    details: {
      problem:
        "Mental-health education and self-reflection tools can feel passive, especially for users who respond better to interactive scenarios.",
      built:
        "A 3D episodic self-therapy game prototype with CBT-inspired scenarios, interactive environments, and AI-driven characters.",
      approach:
        "Combined Unity scene building, narrative design, gamified CBT concepts, Convai-powered NPC dialogue, and prompt-engineered character roles.",
      role:
        "Led the team, helped secure project funding, and contributed across game design, AI character integration, UI, and environment development.",
      impact:
        "Delivered a playable prototype and demonstrated how conversational AI and 3D interaction can support reflective therapy-inspired experiences.",
    },
    links: [
      {
        label: "Drive",
        href: "https://drive.google.com/drive/folders/1pgw9wVIB21X1mFXPNIOy6jHTIgxtkcNp?usp=sharing",
        kind: "drive",
      },
      {
        label: "YouTube",
        href: "https://youtu.be/JkNuvdcbFAU",
        kind: "youtube",
      },
    ],
  },
  {
    title: "Shinyonaika 2D - Graphic Novel",
    date: "Jan 2023 - May 2023",
    category: "AI Storytelling",
    image: "/project-media/shinyonaika-2d-preview.gif",
    text: "A 2D branching graphic novel prototype combining mental health research with AI-assisted emotion classification.",
    bullets: [
      "Led the team at Salz AI '21 Hackathon.",
      "Researched Cognitive Behavioral Therapy and categorized mental health problem spaces.",
      "Created graphic novel storylines and narrative branching.",
      "Integrated Cohere AI and Whisper API for emotion classification and audio-to-text in Unity.",
    ],
    tags: ["Unity", "C#", "Cohere AI", "Whisper API", "NLP"],
    details: {
      problem:
        "Mental-health storytelling needs accessible interaction patterns that can adapt to user input without becoming clinically overreaching.",
      built:
        "A 2D branching graphic-novel prototype that combines CBT research, narrative choices, emotion classification, and speech-to-text input.",
      approach:
        "Built the Unity narrative flow, researched CBT problem spaces, integrated Cohere AI for classification, and used Whisper for audio-to-text input.",
      role:
        "Led the hackathon team while shaping the story structure, AI integration, and interactive prototype experience.",
      impact:
        "Created a compact AI storytelling prototype showing how language models and branching narratives can support reflective mental-health experiences.",
    },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/GeoffreyLazer/shinyonaika-v1-.git",
        kind: "github",
      },
      {
        label: "YouTube",
        href: "https://youtu.be/Of2EgyOK6ko",
        kind: "youtube",
      },
    ],
  },
  {
    title: "Helex VR",
    date: "Dec 2021 - Aug 2022",
    category: "VR Training",
    image: "/project-media/helex-preview.gif",
    text: "A VR athlete training environment built in Unity with computer vision feedback for exercise form.",
    bullets: [
      "Won Smart India Hackathon '22 and secured Rs. 100K funding.",
      "Created a VR training environment for athletes.",
      "Developed a CV-based YOLO model to correct exercise form with alerts and a progress bar.",
    ],
    tags: ["Unity", "C#", "VR", "YOLO", "Computer Vision"],
    details: {
      problem:
        "Athletes need training feedback that is immediate and spatial, especially when correcting form during repeated exercises.",
      built:
        "A Unity VR training environment with computer-vision feedback for exercise form and progress-aware alerts.",
      approach:
        "Connected a VR training scene with YOLO-based detection logic, alert states, and feedback UI for form-correction workflows.",
      role:
        "Contributed to the VR environment and computer-vision feedback system while working as part of the hackathon team.",
      impact:
        "Won Smart India Hackathon 2022 and demonstrated a practical VR-plus-CV concept for athlete training support.",
    },
  },
  {
    title: "Defense Rover",
    date: "Mar 2023 - Mar 2023",
    category: "AI Hackathon",
    image: "/project-media/defense-rover-preview.gif",
    gallery: [
      "/project-media/aurganon-certificate.jpg",
      "/project-media/aurganon-event-1.jpg",
      "/project-media/aurganon-event-2.jpg",
    ],
    text: "Aurganon'23 Hackathon runners-up project for unmanned border surveillance.",
    bullets: [
      "Designed an unmanned rover concept for object surveillance and underground movement detection.",
      "Led the team and worked on YOLO-based object detection.",
      "Combined object detection with pulse infrared detection for above-ground and underground monitoring.",
    ],
    tags: ["YOLO", "Computer Vision", "Object Detection", "Python", "Embedded AI"],
    details: {
      problem:
        "Border and perimeter surveillance concepts need a way to detect visible objects while also reasoning about movement that may not be directly visible.",
      built:
        "A hackathon rover concept combining object surveillance, YOLO-based detection, and pulse infrared detection for above-ground and underground monitoring.",
      approach:
        "Used computer-vision object detection as the primary perception layer and paired it with sensor-driven detection logic for movement-focused monitoring.",
      role:
        "Led the team and contributed to the object-detection workflow, system concept, and prototype presentation.",
      impact:
        "Placed 2nd at Aurganon'23 Hackathon and produced a working concept demo for safety-focused surveillance.",
    },
  },
  {
    title: "Intelligent Garbage Classification using Deep Learning",
    date: "May 2023 - May 2023",
    category: "Deep Learning",
    image: "/project-media/garbage-classification-preview.gif",
    text: "A transfer-learning classification system for garbage recognition.",
    bullets: [
      "Implemented the solution and trained a dataset using VGG16.",
      "Used CNN transfer learning for image classification.",
      "Built a demo-backed deep learning workflow for waste classification.",
    ],
    tags: ["Python", "TensorFlow/Keras", "CNN", "VGG16", "Image Classification"],
    links: [
      {
        label: "YouTube",
        href: "https://www.youtube.com/watch?v=D19uHTfwIls&feature=youtu.be",
        kind: "youtube",
      },
    ],
  },
  {
    title: "gMeet Turn Off Cam When Unattended Browser Extension",
    date: "Dec 2021 - Feb 2022",
    category: "Browser AI Tool",
    text: "A browser extension that switches off a Google Meet camera when no one is attending.",
    bullets: [
      "Worked on enabling camera controls through a browser extension.",
      "Integrated YOLO object detection using PyTorch.",
      "Connected detection behavior with browser automation logic.",
    ],
    tags: ["JavaScript", "Browser Extension", "PyTorch", "YOLO", "Computer Vision"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/AaronSajiAlexander/ai-extension",
        kind: "github",
      },
    ],
  },
  {
    title: "MediAssist",
    date: "Apr 2021 - Dec 2021",
    category: "Health App",
    image: "/project-media/mediassist-preview.gif",
    text: "An Android app for tracking and monitoring chronic patients, vitals, and health condition data.",
    bullets: [
      "Built around chronic patient monitoring and health-condition tracking.",
      "Focused on practical healthcare support through mobile app workflows.",
    ],
    tags: ["Android", "Healthcare", "Patient Monitoring", "Mobile App"],
  },
];

export const skills = [
  "Data Engineering",
  "Long Short-term Memory (LSTM)",
  "Wildfire",
  "Unity XR",
  "C#",
  "Python",
  "PyTorch",
  "TensorFlow",
  "React",
  "Flask",
  "PostgreSQL",
  "GCP",
  "OpenCV",
  "Vertex AI",
  "System Design",
  "Unity Game Engine & C#",
  "VR/XR",
];

export const skillCategories: SkillCategory[] = [
  {
    title: "AI/ML",
    signal: "Modeling + adaptation",
    accent: "#19e6ff",
    summary: "ML models, sequence/time-series work, RAG, fine-tuning, and CV pipelines.",
    skills: [
      { name: "Python", logo: `${deviconBase}/python/python-original.svg` },
      { name: "PyTorch", logo: `${deviconBase}/pytorch/pytorch-original.svg` },
      { name: "TensorFlow/Keras", logo: `${deviconBase}/tensorflow/tensorflow-original.svg` },
      { name: "LSTM", mark: "LSTM" },
      { name: "RAG", mark: "RAG" },
      { name: "LoRA", mark: "LoRA" },
      { name: "U-Net", mark: "U" },
      { name: "CV", logo: `${simpleIconBase}/opencv.svg` },
      { name: "Data Prep", mark: "ETL" },
    ],
  },
  {
    title: "XR + 3D",
    signal: "Spatial interfaces",
    accent: "#ffb86b",
    summary: "Unity, OpenXR, real-time 3D, medical visualization, meshes, and immersive UI.",
    skills: [
      { name: "Unity", logo: `${deviconBase}/unity/unity-original.svg` },
      { name: "C#", logo: `${deviconBase}/csharp/csharp-original.svg` },
      { name: "OpenXR", mark: "OXR" },
      { name: "XR Hands", mark: "XR" },
      { name: "Three.js", logo: `${deviconBase}/threejs/threejs-original.svg` },
      { name: "React Three Fiber", logo: `${deviconBase}/react/react-original.svg` },
      { name: "VTK", mark: "VTK" },
      { name: "Volumetric Rendering", mark: "VOL" },
      { name: "DICOM", mark: "DCM" },
      { name: "Mesh Processing", mark: "MESH" },
    ],
  },
  {
    title: "Full-Stack",
    signal: "Product surfaces",
    accent: "#7cff9d",
    summary: "React surfaces, typed apps, APIs, backend services, and database-backed tools.",
    skills: [
      { name: "React", logo: `${deviconBase}/react/react-original.svg` },
      { name: "Next.js", logo: `${deviconBase}/nextjs/nextjs-original.svg` },
      { name: "Vite", logo: `${deviconBase}/vitejs/vitejs-original.svg` },
      { name: "TypeScript", logo: `${deviconBase}/typescript/typescript-original.svg` },
      { name: "JavaScript", logo: `${deviconBase}/javascript/javascript-original.svg` },
      { name: "Node.js", logo: `${deviconBase}/nodejs/nodejs-original.svg` },
      { name: "FastAPI", logo: `${deviconBase}/fastapi/fastapi-original.svg` },
      { name: "Flask", logo: `${deviconBase}/flask/flask-original.svg` },
      { name: "PostgreSQL", logo: `${deviconBase}/postgresql/postgresql-original.svg` },
      { name: "REST APIs", mark: "API" },
    ],
  },
  {
    title: "Data + DevOps",
    signal: "Pipelines + reliability",
    accent: "#ff4fd8",
    summary: "CI/CD, Linux, Docker, data formats, cloud deploys, and reproducible workflows.",
    skills: [
      { name: "Docker", logo: `${deviconBase}/docker/docker-original.svg` },
      { name: "GitHub Actions", logo: `${deviconBase}/githubactions/githubactions-original.svg` },
      { name: "Linux", logo: `${deviconBase}/linux/linux-original.svg` },
      { name: "SQL", mark: "SQL" },
      { name: "Parquet", mark: "PQ" },
      { name: "CSV Pipelines", mark: "CSV" },
      { name: "Cloud Deployment", logo: `${simpleIconBase}/googlecloud.svg` },
      { name: "CI/CD", mark: "CI" },
    ],
  },
];

export const education: EducationItem[] = [
  {
    school: "University of Alberta",
    credential: "Master's degree, Computing Science, Multimedia",
    date: "Sep 2024 - Jul 2026",
    initials: "UofA",
    accent: "#ffcf3f",
    logo: "/education-logos/ualberta.svg",
  },
  {
    school: "Loyola-ICAM College of Engineering and Technology",
    credential: "Bachelor of Engineering - BE, Computer Science and Engineering",
    date: "Jul 2020 - Jun 2024",
    initials: "LICET",
    accent: "#19e6ff",
    logo: "/education-logos/licet.png",
  },
  {
    school: "St. Xavier's School, Jaipur",
    credential: "High School Diploma, PCM-IP",
    date: "Mar 2008 - Mar 2020",
    initials: "SX",
    accent: "#7cff9d",
    logo: "/education-logos/st-xaviers-jaipur.png",
  },
  {
    school: "Gefion Gymnasium - STX",
    credential: "High School Diploma, Student Exchange Program",
    date: "Apr 2018 - Jun 2018",
    initials: "STX",
    accent: "#ffb86b",
    logo: "/education-logos/gefion.svg",
  },
];

export const certifications = [
  "Salz21 AI Hackathon Certificate",
  "From Data to Insights with Google Cloud",
  "R Programming for Machine Learning and Data Science",
  "Object Detection and Recognition using Deep Learning and OpenCV",
  "HTML, WordPress and CSS for Internet Marketers",
];
