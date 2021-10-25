function Searcher() {
  return (
    <div className='searchArea'>
      <label htmlFor=''>
        <input placeholder='Search in DayPost' type='text' />
      </label>
      <button>Search</button>
    </div>
  );
}

export default Searcher;
