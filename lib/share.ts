import { getGuessStatuses } from "./statuses";
import { solutionIndex } from "./words";
import { GAME_TITLE } from "../constants/strings";
import { isomorphicTrack } from "./analytics";

export const shareStatus = (guesses: string[], lost: boolean) => {
  isomorphicTrack("share", { guesses, lost, round: solutionIndex });

  navigator.clipboard.writeText(
    `${GAME_TITLE} ${solutionIndex} ${lost ? "X" : guesses.length}/6\n\n` +
      generateEmojiGrid(guesses),
  );
};

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess);
      return guess
        .split("")
        .map((letter, i) => {
          switch (status[i]) {
            case "correct":
              return "🟩";
            case "present":
              return "🟨";
            default:
              return "⬜";
          }
        })
        .join("");
    })
    .join("\n");
};
