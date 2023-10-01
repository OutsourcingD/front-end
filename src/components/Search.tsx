import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import { SearchResponseDto } from "../dto/SearchResultDto";
import { DocsHosDto } from "../dto/DocsHosDto";
import { DoctorResponseDto } from "../dto/DoctorResponseDto";

interface SearchProps {
    page: number;
    category: number;
    parent: number;
    onSearch: (value: string) => void;
    onSearchResult?: (value: SearchResponseDto[]) => void;
    onDoctorSearchResult?: (value: DocsHosDto[]) => void;
    onDoctorPageSearchResult?: (value: DoctorResponseDto[]) => void;
}

const Search = (props: SearchProps) => {
    const [value, setText] = useState(" ");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onSearch(e.target.value);
        setText(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(props.parent === 0) {
            if (props.category < 9) {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `${
                        process.env.REACT_APP_SERVER_URL
                    }/review/search?type=${0}&query=${value}&category=${
                        props.category
                    }&pages=${0}`,
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                    },
                }).then((res) => {
                    if (props.onSearchResult) {
                        props.onSearchResult(res.data);
                        props.onSearch(value);
                    }
                });
            } else {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `${process.env.REACT_APP_SERVER_URL}/review/search/doc-hos?sortType=0&type=${props.category}&query=${value}`,
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                    },
                }).then((res) => {
                    if (props.onDoctorSearchResult) {
                        props.onDoctorSearchResult(res.data);
                        props.onSearch(value);
                    }
                });
            }
        } else if(props.parent === 1) {
            if (props.category < 9) {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `${
                        process.env.REACT_APP_SERVER_URL
                    }/review/recommendation/search?&pages=${0}&query=${value}&part=${props.category}`,
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                    },
                }).then((res) => {
                    if (props.onSearchResult) {
                        props.onSearchResult(res.data);
                        props.onSearch(value);
                    }
                });
            } else {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `${process.env.REACT_APP_SERVER_URL}/review/recommendation/doc-hos?type=${props.category}&query=${value}`,
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                    },
                }).then((res) => {
                    if (props.onDoctorSearchResult) {
                        props.onDoctorSearchResult(res.data);
                        props.onSearch(value);
                    }
                });
            }
        }
        else if(props.parent === 3) {
            axios({
                method: "get",
                url: `${process.env.REACT_APP_SERVER_URL}/doctor/search?pages=0&title=${value}`,
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                },
            }).then((res) => {
                if (props.onDoctorPageSearchResult) {
                    props.onDoctorPageSearchResult(res.data);
                    props.onSearch(value);
                }
            });
        }
    };

    function onclick() {
        if(props.parent === 0) {
            if (props.category < 9) {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `${
                        process.env.REACT_APP_SERVER_URL
                    }/review/recommendation/search?&pages=${0}&query=${value}&part=${props.category}`,
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                    },
                }).then((res) => {
                    if (props.onSearchResult) {
                        props.onSearchResult(res.data);
                    }
                });
            } else {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `${process.env.REACT_APP_SERVER_URL}/review/recommendation/doc-hos?type=${props.category}&query=${value}`,
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                    },
                }).then((res) => {
                    if (props.onDoctorSearchResult) {
                        props.onDoctorSearchResult(res.data);
                    }
                });
            }
        }
        else if(props.parent === 1) {
            if (props.category < 9) {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `${
                        process.env.REACT_APP_SERVER_URL
                    }/review/recommendation/search?&pages=${0}&query=${value}&part=${props.category}`,
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                    },
                }).then((res) => {
                    if (props.onSearchResult) {
                        props.onSearchResult(res.data);
                        props.onSearch(value);
                    }
                });
            } else {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `${process.env.REACT_APP_SERVER_URL}/review/recommendation/doc-hos?type=${props.category}&query=${value}`,
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                    },
                }).then((res) => {
                    if (props.onDoctorSearchResult) {
                        props.onDoctorSearchResult(res.data);
                        props.onSearch(value);
                    }
                });
            }
        }
        else if(props.parent === 3) {
            axios({
                method: "get",
                url: `${process.env.REACT_APP_SERVER_URL}/doctor/search?pages=0&title=${value}`,
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                },
            }).then((res) => {
                if (props.onDoctorPageSearchResult) {
                    props.onDoctorPageSearchResult(res.data);
                    props.onSearch(value);
                }
            });
        }
    }

    useEffect(() => {
        setText("");
    }, [props.category]);

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
};

export default Search;
