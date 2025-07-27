import Button from '../Button';
import { CloseIcon } from '../Icons';
import './selectedFilters.css';

function SelectedFilters({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedTags,
  setSelectedTags,
  searchQuery,
  setSearchQuery,
  className
}) {
  const hasFilters =
    selectedYear || selectedMonth || selectedTags.length > 0 || searchQuery;

  return (
    <div className={className}>
      <div className="filters-active">
        {selectedYear && (
          <span className="filter-item">
            {selectedYear}
            <Button onClick={() => setSelectedYear(null)}
                    text={<CloseIcon/>}
                    />
          </span>
        )}
        {selectedMonth && (
          <span className="filter-item">
            {selectedMonth}
            <Button onClick={() => setSelectedMonth(null)}
                    text={<CloseIcon/>}
                    />
          </span>
        )}
        {selectedTags.map((tag) => (
          <span className="filter-item" key={tag}>
            {tag}
            <Button onClick={() =>
                    setSelectedTags((prev) => prev.filter((t) => t !== tag))}
                    text={<CloseIcon/>}
                    />
          </span>
        ))}
        {searchQuery && (
          <span className="filter-item">
            Search: "{searchQuery}"
            <Button onClick={() => setSearchQuery('')}
                    text={<CloseIcon/>}
                    />
          </span>
        )}

        {hasFilters && (
          <Button className='clear-all-btn'
                  text='Clear all'
                  onClick={() => {
                    setSelectedYear(null);
                    setSelectedMonth(null);
                    setSelectedTags([]);
                    setSearchQuery('');
                  }}/>
        )}
      </div>
    </div>
  );
}

export default SelectedFilters;
