import { articles } from "./articles";

// Sort articles by date descending to get the latest one
const sortedArticles = [...articles].sort((a, b) => {
  const dateA = new Date(`${a.month} 1, ${a.year}`);
  const dateB = new Date(`${b.month} 1, ${b.year}`);
  return dateB - dateA;
});

// Get latest year/month from the first article
const latestYear = sortedArticles[0]?.year;
const latestMonth = sortedArticles[0]?.month;

export {sortedArticles, latestMonth, latestYear}