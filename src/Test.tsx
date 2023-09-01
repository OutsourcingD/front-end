import React from "react";

function Test () {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <p>test</p>
            <div style={{display: "flex", justifyContent: "center", width: "100px", height: "100px", backgroundColor: "rgba(230, 194, 234, 69%)"}}>
                <p>test</p>
            </div>
            <div style={{display: "flex", justifyContent: "center", width: "100px", height: "100px", background: "linear-gradient(to bottom, #A992D5 10%, #BF64CE 20%, #FAC1EC 100%)"}}>
                <p>test</p>
            </div>
        </div>
    );
}

export default Test;