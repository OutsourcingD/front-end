import React from "react";
import "./DropBox.css";

function DropBox() {
    return (
		<select id="dropbox">
			<option key="banana" value="banana">
				바나나
			</option>
			<option key="apple" value="apple">사과</option>
			<option key="orange" value="orange">오렌지</option>
		</select>
	);
}

export default DropBox;