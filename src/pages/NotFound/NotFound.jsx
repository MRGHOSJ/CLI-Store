import React from "react";
import Cards from "../../components/Cards/Cards";
import Table from "../../components/Table/Table";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="NotFound" style={{paddingTop:"80px"}}>
      <img
        src="https://cdn.dribbble.com/users/718859/screenshots/3267029/jisunpark_404-error.gif"
        width={700}
        style={{marginLeft:"auto",marginRight:"auto"}}
      />
    </div>
  );
};

export default NotFound;
