import React from "react";
import "./ChangeReview.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangeReview = () => {
  const [sort, setSort] = React.useState(0);
  const [defaultSort, setDefaultSort] = React.useState<number>(0);
  const [isSubmit, setIsSubmit] = React.useState<boolean>(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER_URL}/api/admin/review/order`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    }).then((res) => {
        setDefaultSort(res.data.recommendReview);
        setSort(res.data.recommendReview);
    }).catch((err) => {
      if(err.status === 401 || err.status === 403) {
        alert("This is not admin ID.");
        navigate("/login");
      }
      else 
      {
        alert(`Contact to developer. ${err.status}`);
        navigate("/");
      }
    });
  }, []);

  React.useEffect(() => {
    defaultSort === sort ? setIsSubmit(false) : setIsSubmit(true);
  }, [sort]);

  const handleSubmit = () => {
    if(isSubmit) {
        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/api/admin/review/order`,
            data: {
                recommendReview: sort,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            if(res.status === 200) {
                alert("change success");
                setDefaultSort(sort);
                setIsSubmit(false);
            }
            else {
                alert("change fail");
            }
        });
    }
  }

  return (
    <div className="change_review_page_div">
      <div className="change_review_container">
        <p id="change_review_title">Change Sorting Review method</p>
      </div>
      <div className="change_review_button_box">
        <div style={{display: "flex", flexDirection: "row"}}>
          <p id="change_review_button_sub_ttile">Sorting method</p>
          <img
            src={sort !== 0 ? "/checkbox.png" : "/checkbox_pupple.png"}
            alt=""
            id="change_review_page_check_box"
            onClick={() => setSort(0)}
          />
          <p id="change_review_page_lable">Number of View</p>
          <img
            src={sort !== 1 ? "/checkbox.png" : "/checkbox_pupple.png"}
            alt=""
            id="change_review_page_check_box"
            onClick={() => setSort(1)}
          />
          <p id="change_review_page_lable">Number of Like</p>
          <img
            src={sort !== 2 ? "/checkbox.png" : "/checkbox_pupple.png"}
            alt=""
            id="change_review_page_check_box"
            onClick={() => setSort(2)}
          />
          <p id="change_review_page_lable">Number of Comment</p>
        </div>
        <div
          className={
            !isSubmit
              ? "review_page_submit_button_div"
              : "review_page_submit_button_active_div"
          }
          onClick={handleSubmit}
        >
          <p
            id={
              !isSubmit
                ? "review_page_submit_button_text"
                : "review_page_submit_button_active_text"
            }
          >
            Save
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangeReview;
