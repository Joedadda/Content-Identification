export type ConfidenceLevel = "high" | "medium" | "low";

export type ResultTone = "good" | "warn" | "unsure";

export type ThumbKind = "speech" | "rain" | "tiger" | "link";

export type ChatAction = {
  id: string;
  label: string;
  reply: string;
  /** Scroll to this element id after the reply is shown. */
  scrollTo?: string;
};

export type Evidence = {
  title: string;
  points: string[];
  closing: string;
};

export type ResultModel = {
  id: string;
  step: number;
  time: string;
  tone: ResultTone;
  emoji: string;
  chip: string;
  verdict: string;
  explanation: string;
  confidence: ConfidenceLevel;
  recommendation: string;
  evidence: Evidence;
  /** Draw attention to the why control on the primary journey. */
  emphasizeWhy?: boolean;
  actions?: ChatAction[];
  dispute?: { label: string; reply: string };
};

export type ChatItem =
  | {
      type: "assistant";
      id: string;
      step: number;
      time: string;
      paragraphs: string[];
    }
  | {
      type: "video";
      id: string;
      step: number;
      time: string;
      caption: string;
      duration: string;
      forwarded: boolean;
    }
  | {
      type: "image";
      id: string;
      step: number;
      time: string;
      caption: string;
      thumb: ThumbKind;
      alt: string;
    }
  | {
      type: "link";
      id: string;
      step: number;
      time: string;
      url: string;
      domain: string;
      title: string;
      description: string;
      caption: string;
    }
  | ({ type: "result" } & ResultModel);
