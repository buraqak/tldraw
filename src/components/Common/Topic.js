import React, { useState } from "react";

const Topic = (props) => {
  const TextonClick = () => {
    document.getElementById("logo1").focus();
    props.goToPage(props.id, props.GroupName, props.Name);
    /*  props.setcurrentTopic(props.Name);
    props.setcurrentGroupName(props.GroupName); */
  };

  return (
    <li
      className={
        props.getVisitedFlag(props.id) ? "nav-item completed" : "nav-item"
      }
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          TextonClick();
        }
      }}
    >
      <div
        id={props.id}
        className={
          props.currentTopicIndex == props.id
            ? "text-link nav-link active "
            : "text-link nav-link "
        }
        tabIndex={props.currentTopicIndex != 0 ? -1 : 0 || props.tabpopup == false ? 0 : -1}
        onClick={TextonClick}
      >
        {" "}
        {props.Name}{" "}
      </div>
    </li>
  );
};
export default Topic;
