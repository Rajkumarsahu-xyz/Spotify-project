import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import YourLibrary from "./YourLibrary";
import { Link } from "react-router-dom";

function LeftSideContainer() {
    return (
        <div className="leftSideContainer">
            <Link to={'/'}>
                <div className="home-btn">
                    <GoHomeFill className="home-icon"/>
                    <h2>Home</h2>
                </div>
            </Link>

            <div className="search-btn">
                <IoSearchSharp className="search-icon"/>
                <h2>Search</h2>
            </div>

            <YourLibrary/>
                
        </div>
    );
}

export default LeftSideContainer;