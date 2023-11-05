import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import { SearchResponseDto } from "../dto/SearchResultDto";
import { DocsHosDto } from "../dto/DocsHosDto";
import { DoctorResponseDto } from "../dto/DoctorResponseDto";
import { HospitalResponseDto } from "../dto/HospitalResponseDto";
import { useNavigate } from "react-router-dom";

interface SearchProps {
    page: number;
    category: number;
    parent: number;
    onSearch: (value: string) => void;
    onSearchResult?: (value: SearchResponseDto[]) => void;
    onDoctorSearchResult?: (value: DocsHosDto[]) => void;
    onDoctorPageSearchResult?: (value: DoctorResponseDto[]) => void;
    onHospitalSearchResult?: (value: HospitalResponseDto[]) => void;
}

const Search = (props: SearchProps) => {
    const [value, setText] = useState(" ");
    const navigate = useNavigate();

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
                    url: `/api/review/search?type=${0}&query=${value}&category=${
                        props.category
                    }&pages=${0}`,
                }).then((res) => {
                    if (props.onSearchResult) {
                        props.onSearchResult(res.data);
                        props.onSearch(value);
                    }
                }).catch((err) => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        alert("This is not admin ID.");
                        navigate("/login");
                    }
                    else {
                        alert(`Contact to developer. ${err.response.status}`);
                        navigate("/");
                    }  
                });
            } else {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `/api/review/search/doc-hos?sortType=0&type=${props.category}&query=${value}`,
                }).then((res) => {
                    if (props.onDoctorSearchResult) {
                        props.onDoctorSearchResult(res.data);
                        props.onSearch(value);
                    }
                }).catch((err) => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        alert("This is not admin ID.");
                        navigate("/login");
                    }
                    else {
                        alert(`Contact to developer. ${err.response.status}`);
                        navigate("/");
                    }    
                });
            }
        } else if(props.parent === 1) {
            if (props.category < 9) {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `/api/review/recommendation/search?&pages=${0}&query=${value}&part=${props.category}`,
                }).then((res) => {
                    if (props.onSearchResult) {
                        props.onSearchResult(res.data);
                        props.onSearch(value);
                    }
                }).catch((err) => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        alert("This is not admin ID.");
                        navigate("/login");
                    }
                    else {
                        alert(`Contact to developer. ${err.response.status}`);
                        navigate("/");
                    }      
                });
            } else {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `/api/review/recommendation/doc-hos?type=${props.category}&query=${value}`,
                }).then((res) => {
                    if (props.onDoctorSearchResult) {
                        props.onDoctorSearchResult(res.data);
                        props.onSearch(value);
                    }
                }).catch((err) => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        alert("This is not admin ID.");
                        navigate("/login");
                    }
                    else {
                        alert(`Contact to developer. ${err.response.status}`);
                        navigate("/");
                    }      
                });
            }
        }
        else if(props.parent === 2) {
            axios({
                method: "get",
                url: `/api/hospital/search?pages=0&title=${value}`,
            }).then((res) => {
                if (props.onHospitalSearchResult) {
                    props.onHospitalSearchResult(res.data);
                    props.onSearch(value);
                }
            }).catch((err) => {
                if(err.response.status === 401 || err.response.status === 403) {
                    alert("This is not admin ID.");
                    navigate("/login");
                }
                else {
                    alert(`Contact to developer. ${err.response.status}`);
                    navigate("/");
                }        
            });
        } else if(props.parent === 3) {
            axios({
                method: "get",
                url: `/api/doctor/search?pages=0&title=${value}`,
            }).then((res) => {
                if (props.onDoctorPageSearchResult) {
                    props.onDoctorPageSearchResult(res.data);
                    props.onSearch(value);
                }
            }).catch((err) => {
                if(err.response.status === 401 || err.response.status === 403) {
                    alert("This is not admin ID.");
                    navigate("/login");
                }
                else {
                    alert(`Contact to developer. ${err.response.status}`);
                    navigate("/");
                }          
            });
        }
    };

    function onclick() {
        if(props.parent === 0) {
            if (props.category < 9) {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `/api/review/recommendation/search?&pages=${0}&query=${value}&part=${props.category}`,
                }).then((res) => {
                    if (props.onSearchResult) {
                        props.onSearchResult(res.data);
                    }
                }).catch((err) => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        alert("This is not admin ID.");
                        navigate("/login");
                    }
                    else {
                        alert(`Contact to developer. ${err.response.status}`);
                        navigate("/");
                    }      
                });
            } else {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `/api/review/recommendation/doc-hos?type=${props.category}&query=${value}`,
                }).then((res) => {
                    if (props.onDoctorSearchResult) {
                        props.onDoctorSearchResult(res.data);
                    }
                }).catch((err) => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        alert("This is not admin ID.");
                        navigate("/login");
                    }
                    else {
                        alert(`Contact to developer. ${err.response.status}`);
                        navigate("/");
                    }        
                });
            }
        }
        else if(props.parent === 1) {
            if (props.category < 9) {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `/api/review/recommendation/search?&pages=${0}&query=${value}&part=${props.category}`,
                }).then((res) => {
                    if (props.onSearchResult) {
                        props.onSearchResult(res.data);
                        props.onSearch(value);
                    }
                }).catch((err) => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        alert("This is not admin ID.");
                        navigate("/login");
                    }
                    else {
                        alert(`Contact to developer. ${err.response.status}`);
                        navigate("/");
                    }        
                });
            } else {
                axios({
                    method: "get", // or 'post', 'put', etc.
                    url: `/api/review/recommendation/doc-hos?type=${props.category}&query=${value}`,
                }).then((res) => {
                    if (props.onDoctorSearchResult) {
                        props.onDoctorSearchResult(res.data);
                        props.onSearch(value);
                    }
                }).catch((err) => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        alert("This is not admin ID.");
                        navigate("/login");
                    }
                    else {
                        alert(`Contact to developer. ${err.response.status}`);
                        navigate("/");
                    }          
                });
            }
        }
        else if(props.parent === 3) {
            axios({
                method: "get",
                url: `/api/doctor/search?pages=0&title=${value}`,
            }).then((res) => {
                if (props.onDoctorPageSearchResult) {
                    props.onDoctorPageSearchResult(res.data);
                    props.onSearch(value);
                }
            }).catch((err) => {
                if(err.response.status === 401 || err.response.status === 403) {
                    alert("This is not admin ID.");
                    navigate("/login");
                }
                else {
                    alert(`Contact to developer. ${err.response.status}`);
                    navigate("/");
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
