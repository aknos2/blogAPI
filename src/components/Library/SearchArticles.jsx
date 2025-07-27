import Button from "../Button";
import { ArrowDownIcon } from "../Icons";
import { articles } from '../../services/articles';
import { useState } from "react";

function SearchMonth({ year, className, onMonthClick }) {
  // Count articles by month for the given year
  const monthMap = articles.reduce((acc, article) => {
    if (article.year === year) {
      acc[article.month] = (acc[article.month] || 0) + 1;
    }
    return acc;
  }, {});

  // Convert to a sorted array (optional: you can define your own order)
  const sortedMonths = Object.entries(monthMap).sort(([a], [b]) =>
    new Date(`${a} 1`).getMonth() - new Date(`${b} 1`).getMonth()
  );

  return (
    <div className={className}>
      <ul>
        {sortedMonths.map(([month, count]) => (
          <li key={month} onClick={() => onMonthClick(month)}>
            {month} <span>({count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SearchDate({ onMonthSelect }) {
  const [openYear, setOpenYear] = useState(null);

  const toggleMonthList = (year) => {
    setOpenYear(prev => (prev === year ? null : year));
  };

  return (
    <div className="search-date">
      {["2024", "2025"].map((year) => (
        <div className={`search-month-wrapper`} key={year}>
          <div className='search-year' 
               onClick={() => toggleMonthList(year)}>
            <Button text={year} className={`${openYear === year ? 'active-underline' : ''}`}/>
            <ArrowDownIcon />
          </div>
          <SearchMonth
            year={year}
            className={`search-month ${openYear === year ? 'open-list' : ''}`}
            onMonthClick= {(month) => onMonthSelect(year, month)}
          />
        </div>
      ))}
    </div>
  )
}

export default SearchDate;