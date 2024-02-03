import React, { useState, createContext, useEffect } from "react";
import Group from "./Group";

const delayFn = async () => {};

const NavSection = (props) => {
  delayFn();

  return (
    <>
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-3 d-md-block sidebar collapse"
      >
        <div className="position-sticky pt-3 pb-4 sidebar-sticky">
          <ul className="list-unstyled ps-0 sidebar-menu">
            {props.leftNavData.Groups.map((gp) => {
              return (
                <li
                  key={gp.id}
                  className={
                    gp.Topics && gp.Topics.length > 0
                      ? "nav-item left-nav-dropdown-menu"
                      : "nav-item"
                  }
                >
                  <Group
                    addOrremoveToCurrentlyExpandedGroups={
                      props.addOrremoveToCurrentlyExpandedGroups
                    }
                    checkForExpand={props.checkForExpand}
                    getVisitedFlag={props.getVisitedFlag}
                    goToPage={props.goToPage}
                    id={gp.id}
                    setcurrentTopic={props.setcurrentTopic}
                    setcurrentTopicIndex={props.setcurrentTopicIndex}
                    Topics={gp.Topics}
                    setcurrentGroupName={props.setcurrentGroupName}
                    GroupName={gp.GroupName}
                    currentTopicIndex={props.currentTopicIndex}
                    tabpopup={props.tabpopup}
                    setTabPopup={props.setTabPopup}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};
export default NavSection;
