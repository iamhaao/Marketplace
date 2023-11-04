import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="bg-slate-200 shadow-sm">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <div className="font-bold text-sm sm:text-xl flex flex-wrap">
          <Link to="/">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </Link>
        </div>
        <div className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            className="bg-transparent w-24 sm:w-64 focus:outline-none "
            type="text"
            placeholder="Search ..."
          />
          <FaSearch className="text-slate-600" />
        </div>
        <ul className="flex gap-4 font-sans ">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className=" sm:inline text-slate-700 hover:underline">
              Sign In
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
