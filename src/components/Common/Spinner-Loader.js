import { useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

function SpinnerLoader() {
  let [loading, setLoading] = useState(true);

  return (
    <div className="spinners-loader">
      <FadeLoader
        color={"#2a7411"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        cssOverride={{
          display: "block",
          margin: "0 auto",
          position: "absolute",
          top: "266px",
          left: "0",
          right: "0",
        }}
      />
    </div>
  );
}

export default SpinnerLoader;
