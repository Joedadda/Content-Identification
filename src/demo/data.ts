export type Phase = "idle" | "checking" | "ready";

export type MediaKind = "image" | "video";

export type EvidenceItem = {
  title: string;
  body: string;
  available: boolean;
};

export type CheckResult = {
  verdict: string;
  summary: string;
  why: string[];
  strength: string;
  limitation: string;
  nextLabel: string;
  nextDetail: string;
  investigation: EvidenceItem[];
};

export type Post = {
  id: string;
  name: string;
  handle: string;
  time: string;
  text: string;
  avatar: string;
  replies: string;
  reposts: string;
  likes: string;
  views: string;
  media?: {
    kind: MediaKind;
    alt: string;
    duration?: string;
  };
  result?: CheckResult;
};

export const posts: Post[] = [
  {
    id: "lisbon-rain",
    name: "Mira Chen",
    handle: "mirachen",
    time: "2h",
    avatar: "MC",
    text: "This intersection in Lisbon tonight. No cars, no lights, people just standing in the rain.",
    replies: "86",
    reposts: "1.2K",
    likes: "9.4K",
    views: "402K",
    media: {
      kind: "video",
      duration: "0:14",
      alt: "Night street in heavy rain. A crowd stands in the road. Their reflections and feet do not line up with the pavement.",
    },
    result: {
      verdict: "Likely AI-generated",
      summary:
        "This video shows strong signs of being generated, rather than filmed.",
      why: [
        "Reflections in the wet road do not match the street lights.",
        "Several people never quite meet the ground.",
        "No earlier copy of this clip turned up.",
      ],
      strength: "High confidence",
      limitation:
        "This reads the clip, not the person’s intent, and not every frame was recoverable after compression.",
      nextLabel: "Don’t Share Yet",
      nextDetail:
        "Wait for an original source before passing this on. A confident synthetic read is still not a command.",
      investigation: [
        {
          title: "Source history",
          body: "No earlier appearance found. The earliest copy is this post.",
          available: true,
        },
        {
          title: "Provenance",
          body: "No verified content credentials on the file.",
          available: false,
        },
        {
          title: "Visual analysis",
          body: "Synthetic patterns show up in the reflections, the limbs, and the way the rain repeats.",
          available: true,
        },
      ],
    },
  },
  {
    id: "harbor",
    name: "Andre Okonkwo",
    handle: "andreo",
    time: "5h",
    avatar: "AO",
    text: "Breaking: the harbor wall in Accra collapsed this morning. Dozens missing.",
    replies: "640",
    reposts: "3.1K",
    likes: "12K",
    views: "1.1M",
    media: {
      kind: "image",
      alt: "Waves hitting a stone harbor wall under a grey sky. The photograph looks like a phone camera frame.",
    },
    result: {
      verdict: "Likely authentic",
      summary:
        "The photograph is consistent with a real camera. The caption is a separate question.",
      why: [
        "Grain and compression match a phone photo, not a generated image.",
        "The same frame appeared in March 2024, attached to a different storm.",
        "No edited region stands out in the picture itself.",
      ],
      strength: "High confidence",
      limitation:
        "Authentic media does not mean the claim attached to it is true. This frame matches an older storm, not this morning.",
      nextLabel: "Check the Original Source",
      nextDetail:
        "Open the March 2024 post before treating the caption as news. The photo can be real and the claim can still be false.",
      investigation: [
        {
          title: "Source history",
          body: "First found in March 2024, posted from Cape Coast during a documented storm.",
          available: true,
        },
        {
          title: "Provenance",
          body: "No content credentials. The file has been re-encoded by the platform.",
          available: false,
        },
        {
          title: "The claim",
          body: "Nothing in the picture shows a collapse, a date, or Accra. The caption adds all three.",
          available: true,
        },
      ],
    },
  },
  {
    id: "market",
    name: "Leila Nasser",
    handle: "leilan",
    time: "1h",
    avatar: "LN",
    text: "My cousin at the night market. Can’t believe how sharp this came out.",
    replies: "24",
    reposts: "11",
    likes: "308",
    views: "18K",
    media: {
      kind: "image",
      alt: "A crowded night market lit by warm lamps. One person in front is lit by a cooler light that does not match the stalls.",
    },
    result: {
      verdict: "Likely AI-modified",
      summary:
        "The market looks like a real photo. The person in front does not belong to the same exposure.",
      why: [
        "Stall lighting, grain, and shadows agree with a camera.",
        "The foreground face is lit from the other direction.",
        "Those two signals disagree. They are not averaged into a score.",
      ],
      strength: "Medium confidence",
      limitation:
        "The altered region is the foreground figure. Who changed it, and why, is not something this check can know.",
      nextLabel: "Look at the Altered Region",
      nextDetail:
        "Compare the face with the stalls behind it. The rest of the photo can stay real while one element is synthetic.",
      investigation: [
        {
          title: "Camera signal",
          body: "Noise and lens falloff across the stalls are consistent with a phone photo.",
          available: true,
        },
        {
          title: "Synthetic signal",
          body: "The foreground face has smoother skin, a mismatched shadow, and a hard cut along the shoulder.",
          available: true,
        },
        {
          title: "Provenance",
          body: "No edit history or content credentials were attached.",
          available: false,
        },
      ],
    },
  },
  {
    id: "cropped",
    name: "Relay",
    handle: "relaydesk",
    time: "8h",
    avatar: "RD",
    text: "Reposting this before it gets taken down. Zoom in.",
    replies: "190",
    reposts: "880",
    likes: "2.2K",
    views: "96K",
    media: {
      kind: "image",
      alt: "A heavily compressed, cropped fragment of a larger picture. Edges are blocky and most of the original frame is missing.",
    },
    result: {
      verdict: "Unable to verify",
      summary:
        "There isn’t enough reliable evidence to call this authentic or generated.",
      why: [
        "The file is a crop of a screenshot, compressed more than once.",
        "No original source or earlier full-frame copy was found.",
        "Content credentials are missing.",
      ],
      strength: "Limited evidence",
      limitation:
        "Uncertainty is a result, not a failed guess. A blurry repost can hide both a real photo and a fake one.",
      nextLabel: "Look for Independent Reporting",
      nextDetail:
        "Find the uncropped original, or reporting that shows it, before you rely on this fragment.",
      investigation: [
        {
          title: "Source history",
          body: "Only this cropped repost was found. The full frame is missing.",
          available: false,
        },
        {
          title: "Provenance",
          body: "No content credentials. Recompression has wiped most camera traces.",
          available: false,
        },
        {
          title: "What you can do",
          body: "Search for the wider image, or wait for a newsroom that publishes the original file.",
          available: true,
        },
      ],
    },
  },
];
