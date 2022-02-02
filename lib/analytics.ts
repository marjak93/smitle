import { Analytics } from "analytics";

import segmentPlugin from "@analytics/segment";
import { CharStatus } from "./statuses";

interface GuessEvent {
  word: string;
  isCorrect: boolean;
  statuses: CharStatus[];
}

interface ShareEvent {
  guesses: string[];
  lost: boolean;
}

interface Events {
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
