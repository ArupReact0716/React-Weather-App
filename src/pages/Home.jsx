import React from "react";
// redux
import { useSelector } from "react-redux";
// components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Weather from "../components/weather/Weather";

const Home = () => {
  const { loading, notFound } = useSelector(state => state.weather);

  return (
    <div className="w-100">
      <Header />
      <div className="contant-body">
        {loading &&
          <div>
            <svg className="spinner" viewBox="0 0 50 50">
              <circle
                class="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="5"
              />
            </svg>
          </div>}
        {!loading && !notFound && <Weather />}
        {notFound &&
          <div className="bg-white text-center my-3 p-3 rounded">
            <p className="m-0 h4">
              {notFound}
            </p>
          </div>}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
