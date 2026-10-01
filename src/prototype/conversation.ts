import type { ChatItem, ResultModel } from "./types";

/**
 * Predefined mock conversation. Nothing here is analysed at runtime.
 * Extra result presets are included so later states can be dropped in
 * without redesigning the result card.
 */
export const resultPresets = {
  modified: {
    id: "video-result",
    step: 2,
    time: "10:22",
    tone: "warn",
    emoji: "⚠️",
    chip: "May be changed",
    verdict: "This video may have been changed using AI.",
    explanation: "We found signs that parts of the video may have been altered.",
    confidence: "high",
    recommendation: "We recommend checking the source before forwarding it.",
    emphasizeWhy: true,
    evidence: {
      title: "Here's what we found:",
      points: [
        "Some facial movements show patterns commonly found in AI-generated videos.",
        "We couldn't find a reliable original source for this video.",
        "This version appears to have been re-uploaded several times.",
      ],
      closing:
        "These signals make us fairly confident that the video has been modified.",
    },
    actions: [
      {
        id: "hold",
        label: "Don't forward it",
        reply:
          "All right. It's safer not to forward this until you know where it first came from.",
      },
      {
        id: "next",
        label: "Check another item",
        reply: "Okay. You can send another photo, video, or link any time.",
        scrollTo: "msg-photo",
      },
    ],
  },
  authentic: {
    id: "photo-result",
    step: 3,
    time: "10:26",
    tone: "good",
    emoji: "✅",
    chip: "Looks authentic",
    verdict: "This image appears authentic.",
    explanation:
      "We didn't find strong signs that the image was generated or significantly changed using AI.",
    confidence: "high",
    recommendation:
      "Remember, an authentic image does not necessarily mean that everything being said about it is true.",
    evidence: {
      title: "Here's what we found:",
      points: [
        "The light and small details look like a normal camera photo.",
        "We didn't see strong signs that this picture was made or heavily changed using AI.",
        "A real photo can still be shared with words that are not true.",
      ],
      closing:
        "That's why the photo itself looks authentic. The story sent with it may still need a check.",
    },
    dispute: {
      label: "This doesn't seem right",
      reply:
        "Automated checks aren't always correct. You can review the evidence or check the original source yourself.",
    },
  },
  unable: {
    id: "link-result",
    step: 3,
    time: "10:29",
    tone: "unsure",
    emoji: "⚠️",
    chip: "Not enough to tell",
    verdict: "We couldn't fully verify this content.",
    explanation:
      "We don't have enough reliable evidence to determine whether the video was generated or changed using AI.",
    confidence: "low",
    recommendation:
      "This does not mean the video is fake. It means we don't have enough evidence to say either way. If this information is important, we recommend checking the original source before sharing it.",
    evidence: {
      title: "Here's what we found:",
      points: [
        "The page did not give us a clear original video to examine.",
        "We couldn't find a trusted source that matches this link.",
        "There isn't enough information to compare it with a known original.",
      ],
      closing:
        "This is why we say we couldn't verify it. Not enough evidence is different from calling something fake.",
    },
  },
  generated: {
    id: "ai-result",
    step: 3,
    time: "10:33",
    tone: "warn",
    emoji: "⚠️",
    chip: "Made with AI",
    verdict: "This image appears to be AI-generated.",
    explanation:
      "We found several signs suggesting that this image was created using generative AI.",
    confidence: "high",
    recommendation:
      "This picture was likely made by a computer, not taken with a camera. It's safer not to share it as a real photo.",
    evidence: {
      title: "Here's what we found:",
      points: [
        "The face and the tiger look unusually smooth, more like a painting than a photo.",
        "The light and shadows don't sit together in a natural way.",
        "Small details show patterns often seen in computer-made images.",
      ],
      closing:
        "These signs make us confident the picture was created with AI.",
    },
  },
  enhanced: {
    id: "enhanced-example",
    step: 9,
    time: "10:40",
    tone: "warn",
    emoji: "⚠️",
    chip: "Partly changed",
    verdict: "This started from a real photo, but parts may have been enhanced using AI.",
    explanation:
      "The original moment looks real. Some areas look smoothed or added afterwards.",
    confidence: "medium",
    recommendation: "Check with the person who took the photo before sharing it.",
    evidence: {
      title: "Here's what we found:",
      points: [
        "Most of the photo matches a normal camera picture.",
        "One area looks smoother and more edited than the rest.",
      ],
      closing: "So the photo is partly real, with changes added later.",
    },
  },
  mixed: {
    id: "mixed-example",
    step: 9,
    time: "10:41",
    tone: "warn",
    emoji: "⚠️",
    chip: "Mixed signs",
    verdict: "Some parts look real, and some parts may have been made with AI.",
    explanation: "We don't think the whole picture is the same kind of image.",
    confidence: "medium",
    recommendation: "Treat the whole message with care before forwarding it.",
    evidence: {
      title: "Here's what we found:",
      points: [
        "The background looks like a normal photo.",
        "The main subject shows signs of being computer-made.",
      ],
      closing: "Different parts of the picture are telling us different things.",
    },
  },
  reupload: {
    id: "reupload-example",
    step: 9,
    time: "10:42",
    tone: "unsure",
    emoji: "⚠️",
    chip: "Copied around",
    verdict: "This looks like a copy of a copy. We can't see the original.",
    explanation:
      "The file has been saved and shared so many times that its origin is unclear.",
    confidence: "low",
    recommendation: "Ask the sender where they got it before you pass it on.",
    evidence: {
      title: "Here's what we found:",
      points: [
        "We couldn't trace a first upload.",
        "The quality looks reduced, which often happens when something is saved again and again.",
      ],
      closing: "Without an original, we can't say more than this.",
    },
  },
  conflicting: {
    id: "conflicting-example",
    step: 9,
    time: "10:43",
    tone: "unsure",
    emoji: "⚠️",
    chip: "Mixed evidence",
    verdict: "Different checks point in different directions.",
    explanation: "Some signs look ordinary. Others look unusual. They don't agree.",
    confidence: "low",
    recommendation:
      "We can't give a firm answer. If it matters, check the original source.",
    evidence: {
      title: "Here's what we found:",
      points: [
        "One check looks like a normal photo or video.",
        "Another check shows patterns that can appear in AI-made media.",
      ],
      closing:
        "When the signs conflict, the honest answer is that we are not sure.",
    },
  },
} as const satisfies Record<string, ResultModel>;

export const conversation: ChatItem[] = [
  {
    type: "assistant",
    id: "intro-a",
    step: 0,
    time: "10:14",
    paragraphs: [
      "👋 Hi! I'm here to help you check photos, videos and links you're unsure about.",
    ],
  },
  {
    type: "assistant",
    id: "intro-b",
    step: 0,
    time: "10:14",
    paragraphs: [
      "Send me something you'd like to check, and I'll tell you what we can determine about it.",
    ],
  },
  {
    type: "video",
    id: "video",
    step: 1,
    time: "10:21",
    duration: "0:42",
    forwarded: true,
    caption: "My friend sent me this. Is it real?",
  },
  { type: "result", ...resultPresets.modified },
  {
    type: "image",
    id: "photo",
    step: 3,
    time: "10:25",
    thumb: "rain",
    alt: "Photo of a wet lane, an auto rickshaw, and apartment buildings after rain.",
    caption: "This was in our society group. What about this photo?",
  },
  { type: "result", ...resultPresets.authentic },
  {
    type: "link",
    id: "link",
    step: 3,
    time: "10:28",
    url: "https://example.com/video",
    domain: "example.com",
    title: "Watch: announcement video",
    description: "A short clip shared from a group chat.",
    caption: "Can you check this?",
  },
  { type: "result", ...resultPresets.unable },
  {
    type: "image",
    id: "ai-photo",
    step: 3,
    time: "10:32",
    thumb: "tiger",
    alt: "A very smooth picture of a woman standing beside a tiger in a living room.",
    caption: "One more. My nephew said a computer made this picture.",
  },
  { type: "result", ...resultPresets.generated },
];

export const OPENING_STEP = 2;
export const FINAL_STEP = 3;
