import { WORDS } from "../constants/wordlist";
import { VALIDGUESSES } from "../constants/validGuesses";
import { track } from "./analytics";
import { getGuessStatuses } from "./statuses";

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  );
};

export const isWinningWord = (word: string) => {
  const isWord = solution === word;
  track("guess", { word, statuses: getGuessStatuses(word), isCorrect: isWord });

  return isWord;
};

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date("January 1, 2022 00:00:00").valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);
  const nextday = (index + 1) * msInDay + epochMs;

  return {
    solution: WORDS[index % WORDS.length].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextday,
  };
};

export const getWordOfHour = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date("2022-01-01T00:00:00.000Z").valueOf();
  const now = Date.now();
  const msInHour = 3600000;
  const index = Math.floor((now - epochMs) / msInHour);
  const nextHour = (index + 1) * msInHour + epochMs;

  return {
    solution: WORDS[index % WORDS.length].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextHour,
  };
};

export const { solution, solutionIndex, tomorrow } = getWordOfHour();
