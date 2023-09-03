import React, { useState } from "react";
import "./Search.css";

function Search() {
    const [value, setText] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    console.log(e.target.value);
  }

  const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    console.log(e.target);
    setText("");
  }

    return (
        <div className="search_input_div">
            <form onSubmit={onSubmit}>
                <input type="text" value={value} onChange={onChange} placeholder="검색어를 입력하세요." id="search_input"/>
            </form>
            <div className="search_button_div">
                <img src="search.png" alt="search" id="search_button" />
            </div>
        </div>
    );
}

export default Search;