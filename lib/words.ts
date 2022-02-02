import { WORDS } from "../constants/wordlist";
import { VALIDGUESSES } from "../constants/validGuesses";

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  );
};

export const isWinningWord = (word: string) => {
  return solution === word;
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
  const epochMs = new Date("January 1, 2022 00:00:00").valueOf();
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
