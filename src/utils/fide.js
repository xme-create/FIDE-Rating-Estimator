/**
 * FIDE Rating Table 8.1.2 - Expected Score (We)
 */
const FIDE_TABLE = [
  { dmin: 0, dmax: 3, p: 0.50 },
  { dmin: 4, dmax: 10, p: 0.51 },
  { dmin: 11, dmax: 17, p: 0.52 },
  { dmin: 18, dmax: 25, p: 0.53 },
  { dmin: 26, dmax: 32, p: 0.54 },
  { dmin: 33, dmax: 39, p: 0.55 },
  { dmin: 40, dmax: 46, p: 0.56 },
  { dmin: 47, dmax: 53, p: 0.57 },
  { dmin: 54, dmax: 60, p: 0.58 },
  { dmin: 61, dmax: 68, p: 0.59 },
  { dmin: 69, dmax: 76, p: 0.60 },
  { dmin: 77, dmax: 83, p: 0.61 },
  { dmin: 84, dmax: 91, p: 0.62 },
  { dmin: 92, dmax: 98, p: 0.63 },
  { dmin: 99, dmax: 106, p: 0.64 },
  { dmin: 107, dmax: 113, p: 0.65 },
  { dmin: 114, dmax: 121, p: 0.66 },
  { dmin: 122, dmax: 129, p: 0.67 },
  { dmin: 130, dmax: 137, p: 0.68 },
  { dmin: 138, dmax: 145, p: 0.69 },
  { dmin: 146, dmax: 153, p: 0.70 },
  { dmin: 154, dmax: 162, p: 0.71 },
  { dmin: 163, dmax: 170, p: 0.72 },
  { dmin: 171, dmax: 179, p: 0.73 },
  { dmin: 180, dmax: 188, p: 0.74 },
  { dmin: 189, dmax: 197, p: 0.75 },
  { dmin: 198, dmax: 206, p: 0.76 },
  { dmin: 207, dmax: 215, p: 0.77 },
  { dmin: 216, dmax: 225, p: 0.78 },
  { dmin: 226, dmax: 235, p: 0.79 },
  { dmin: 236, dmax: 245, p: 0.80 },
  { dmin: 246, dmax: 256, p: 0.81 },
  { dmin: 257, dmax: 267, p: 0.82 },
  { dmin: 268, dmax: 278, p: 0.83 },
  { dmin: 279, dmax: 290, p: 0.84 },
  { dmin: 291, dmax: 302, p: 0.85 },
  { dmin: 303, dmax: 315, p: 0.86 },
  { dmin: 316, dmax: 328, p: 0.87 },
  { dmin: 329, dmax: 342, p: 0.88 },
  { dmin: 343, dmax: 357, p: 0.89 },
  { dmin: 358, dmax: 374, p: 0.90 },
  { dmin: 375, dmax: 391, p: 0.91 },
  { dmin: 392, dmax: 411, p: 0.92 },
  { dmin: 412, dmax: 432, p: 0.93 },
  { dmin: 433, dmax: 456, p: 0.94 },
  { dmin: 457, dmax: 484, p: 0.95 },
  { dmin: 485, dmax: 517, p: 0.96 },
  { dmin: 518, dmax: 559, p: 0.97 },
  { dmin: 560, dmax: 619, p: 0.98 },
  { dmin: 620, dmax: 735, p: 0.99 },
  { dmin: 736, dmax: 9999, p: 1.00 }
];

export const calculateExpectedScore = (playerRating, opponentRating) => {
  const pr = parseFloat(playerRating) || 0;
  const or = parseFloat(opponentRating) || 0;
  
  const diff = Math.abs(pr - or);
  const entry = FIDE_TABLE.find(row => diff >= row.dmin && diff <= row.dmax);
  const p = entry ? entry.p : 1.0;
  
  return pr >= or ? p : (1 - p);
};

export const calculateRatingChange = (actualScore, expectedScore, kFactor) => {
  return kFactor * (actualScore - expectedScore);
};

/**
 * 1. Final Fix: K value should be an integer.
 * e.g. 700 / 18 = 38.88 -> 38
 */
export const getDynamicK = (nominalK, numGames) => {
  if (numGames * nominalK > 700) {
    return Math.floor(700 / numGames);
  }
  return nominalK;
};

export const determineKFactor = (rating, birthYear, title) => {
  const r = parseFloat(rating) || 0;
  const currentYear = new Date().getFullYear();
  const age = birthYear ? (currentYear - birthYear) : 25; 
  
  if (age <= 18 && r < 2300) return 40;
  
  const highTitles = ['GM', 'IM', 'WGM', 'WIM'];
  const isHighTitled = highTitles.some(t => title?.toUpperCase().includes(t));
  if (r >= 2400 || isHighTitled) return 10;
  
  return 20;
};
