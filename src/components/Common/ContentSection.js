import React, { useEffect } from "react";
import Lesson from "../Lesson/Lesson";

const ContentSection = (props) => {
  return (
    <React.Fragment>
      <main className="col-md-9 ms-sm-auto col-lg-9 intro-main font-size flex-shrink-0">
        <Lesson
          nextTopicIndex={props.nextTopicIndex}
          leftshift={props.leftshift}
          currentTopicIndex={props.currentTopicIndex}
        />
      </main>
    </React.Fragment>
  );
};

export default ContentSection;
