import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

function Searcher({ postArray }) {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const history = useHistory();

  const onSearcherChange = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = postArray.filter((post) => {
        const regex = new RegExp(`${text}`, 'gi');
        return post.title.match(regex);
      });
    }
    setSuggestions(matches);
    console.log('matches', matches);
    setText(text);
  };
  const onSuggestedClickHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };
  const onSearcherSubmit = (e) => {
    e.preventDefault();
    let matchedId = postArray.filter((id) => {
      return id.title.match(text);
    });
    console.log(matchedId[0].id);
    const routeChanger = (id) => {
      const path = `/posts/${id}`;
      history.push(path);
    };
    routeChanger(matchedId[0].id);
  };

  console.log('searcher posts', postArray);
  return (
    <div className='searchArea'>
      <form onSubmit={onSearcherSubmit}>
        <input
          className='search-input'
          placeholder='Search in DayPost'
          type='text'
          onChange={(e) => onSearcherChange(e.target.value)}
          value={text}
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([]);
            }, 100);
          }}
        />

        <button
          className='search-button icon icon-search'
          type='submit'
        ></button>
      </form>
      {suggestions &&
        suggestions.map((suggestion, i) => {
          return (
            <div
              className='searcherSuggestions'
              key={i}
              onClick={() => onSuggestedClickHandler(suggestion.title)}
            >
              {suggestion.title}
            </div>
          );
        })}
    </div>
  );
}

export default Searcher;
