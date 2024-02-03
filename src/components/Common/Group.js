import React, { useState, useRef } from "react";
import Topic from "./Topic";
const Group = (props) => {
  const TextonClick = () => {
    props.goToPage(props.id, props.GroupName, props.GroupName);
    document.getElementById("logo1").focus();
    /*  props.setcurrentTopic(props.GroupName);
    props.setcurrentGroupName(props.GroupName); */
  };

  const TextonClick1 = () => {
    props.addOrremoveToCurrentlyExpandedGroups(props.GroupName);
  };

  if (props.Topics.length == 0) {
    return (
      <ul className="btn-toggle-nav list-unstyled fw-normal pb-1">
        <li
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              TextonClick();
            }
          }}
          className={
            props.getVisitedFlag(props.id) ? "nav-item completed" : "nav-item"
          }
          tabIndex={
            props.currentTopicIndex != 0
              ? -1
              : 0 || props.tabpopup == false
              ? 0
              : -1
          }
          aria-label={props.GroupName}
        >
          <div
            id={props.id}
            onClick={TextonClick}
            className={
              props.currentTopicIndex == props.id
                ? "text-link nav-link active "
                : "text-link nav-link "
            }
          >
            {props.GroupName}
          </div>
        </li>
      </ul>
    );
  } else {
    return (
      <>
        <button
          onKeyPress={(e) => {
            if (e.key === "Tab") {
              TextonClick1();
            }
          }}
          onClick={TextonClick1}
          id={props.Name}
          className="btn btn-toggle d-inline-flex align-items-center border-0 collapsed left-nav-dropdown"
          data-bs-toggle="collapse"
          aria-expanded={props.checkForExpand(props.id) ? "true" : "false"}
          tabIndex={
            props.currentTopicIndex != 0
              ? -1
              : 0 || props.tabpopup == false
              ? 0
              : -1
          }
          aria-label={
            props.checkForExpand(props.id)
              ? props.GroupName + " press enter to collapse the menu item"
              : props.GroupName + " press enter to expand the menu item"
          }
        >
          {props.GroupName}
        </button>
        <div
          className={
            props.checkForExpand(props.id) ? "collapse show" : "collapse"
          }
          id={props.id.split(" ").join("") + "collapse"}
        >
          <ul
            id={props.id.split(" ").join("") + "collapse"}
            className={
              props.checkForExpand(props.id)
                ? "btn-toggle-nav list-unstyled fw-normal pb-1 collapse show"
                : "btn-toggle-nav list-unstyled fw-normal pb-1 collapse"
            }
          >
            {props.Topics.map((t) => {
              return (
                <Topic
                  key={t.id}
                  goToPage={props.goToPage}
                  setcurrentTopic={props.setcurrentTopic}
                  setcurrentGroupName={props.setcurrentGroupName}
                  id={t.id}
                  Name={t.Name}
                  GroupName={t.GroupName}
                  getVisitedFlag={props.getVisitedFlag}
                  currentTopicIndex={props.currentTopicIndex}
                  tabpopup={props.tabpopup}
                  setTabPopup={props.setTabPopup}
                />
              );
            })}
          </ul>
        </div>
      </>
    );
  }
};
export default Group;
