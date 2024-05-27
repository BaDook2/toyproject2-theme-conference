// import React from "react";
import { useLocation } from "react-router-dom";
import { getSearch } from "../api";

function Search() {
  getSearch("dune").then(res=> console.log(res))
  // console.log(useLocation())
  return <div>Search</div>;
}

export default Search;
