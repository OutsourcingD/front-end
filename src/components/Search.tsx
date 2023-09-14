import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import { ReviewResponseDto } from "../dto/ReviewDto";

interface SearchProps {
  page: number;
  onSearch: (value: string) => void;
  onSearchResult: (value: ReviewResponseDto[]) => void;
}

const Search = (props: SearchProps) => {
  const [value, setText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.onSearch(value); // form 제출 시 검색 값을 Main으로 보냅니다.

    axios({
      method: "get", // or 'post', 'put', etc.
      url: `${process.env.REACT_APP_SERVER_URL}/review/search?query=${value}&pages=${0}`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    }).then((res) => {
      props.onSearchResult(res.data);
    });
  };

  function onclick() {
    props.onSearch(value); // form 제출 시 검색 값을 Main으로 보냅니다.

    axios({
      method: "get", // or 'post', 'put', etc.
      url: `${process.env.REACT_APP_SERVER_URL}/review/search?query=${value}&pages=${0}`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    }).then((res) => {
      props.onSearchResult(res.data);
    });
  }

  return (
    <div className="search_input_div">
      <div style={{ width: "100%" }}>
        <form onSubmit={onSubmit} id="search_form">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="검색어를 입력하세요."
            id="search_input"
          />
        </form>
      </div>
      <div className="search_button_div" onClick={onclick}>
        <img src="/search.png" alt="search" id="search_button" />
      </div>
    </div>
  );
}

export default Search;
