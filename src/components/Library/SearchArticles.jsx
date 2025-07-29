import Button from "../Button";
import { ArrowDownIcon } from "../Icons";
import { articles } from '../../services/articles';
import { useState } from "react";

function SearchMonth({ year, className, onMonthClick, selectedYear, selectedMonth }) {
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
    <div className="search-month-wrap">
      <ul className={className}>
        {sortedMonths.map(([month, count]) => {
          const isSelected = selectedYear === year && selectedMonth === month;
          return (
            <li 
              key={month} 
              onClick={() => onMonthClick(month)}
              className={isSelected ? 'selected-month' : ''}
            >
              {month} <span>({count})</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SearchDate({ onMonthSelect, selectedYear, selectedMonth }) {
  const [openYear, setOpenYear] = useState(null);

  const toggleMonthList = (year) => {
    setOpenYear(prev => (prev === year ? null : year));
  };

  return (
    <div className="search-date">
      <div className="year-buttons">
        {["2024", "2025"].map((year) => (
          <div className="search-year" key={year} onClick={() => toggleMonthList(year)}>
            <Button text={year} className={`${openYear === year ? 'active-underline' : ''}`} />
            <ArrowDownIcon />
          </div>
        ))}
      </div>
      
      {openYear && (
        <SearchMonth
          year={openYear}
          className={`search-month ${openYear ? 'open-list' : ''}`}
          onMonthClick={(month) => onMonthSelect(openYear, month)}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
      )}
    </div>
  );
}

export default SearchDate;