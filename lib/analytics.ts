import { Analytics } from "analytics";
import segmentPlugin from "@analytics/segment";

import type { CharStatus } from "./statuses";

declare const window: any;

interface GuessEvent {
  word: string;
  isCorrect: boolean;
  statuses: CharStatus[];
}

interface ShareEvent {
  guesses: string[];
  lost: boolean;
}

export interface Events {
  guess: GuessEvent;
  share: ShareEvent;
}

const analytics = Analytics({
  app: "smitle",
  version: "1.0.0",
  plugins: [
    segmentPlugin({
      writeKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY,
    }),
  ],
});

export const track = async <K extends keyof Events>(
  eventName: K,
  payload: Events[K],
): Promise<void> => {
  analytics.track(eventName, payload);
};

export const isomorphicTrack = async <K extends keyof Events>(
  eventName: K,
  payload: Events[K],
): Promise<void | Response> => {
  if (typeof window !== "undefined" && window.analytics?.initialized) {
    return track(eventName, payload);
  } else {
    return fetch(`/api/${eventName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
};
