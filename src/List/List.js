import React from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";

import ListItem from "./ListItem";
import Util from "../Util/Util";

class List extends React.Component {
  getListItems(list, childIndex = 0) {
    const { props } = this;
    const items = list.map((item, parentIndex) => {
      const key = `${parentIndex}.${childIndex}`;
      childIndex++;

      const htmlAttributes = Util.exclude(item, [
        "content",
        "transitionName",
        "transitionEnterTimeout",
        "transitionLeaveTimeout"
      ]);

      if (Util.isArrayLike(item.content)) {
        return (
          <ListItem
            {...htmlAttributes}
            key={key}
            tag={item.tag}
            transition={true}
            transitionName={props.transitionName}
            transitionEnterTimeout={props.transitionEnterTimeout}
            transitionLeaveTimeout={props.transitionLeaveTimeout}
          >
            {this.getListItems(item.content, childIndex)}
          </ListItem>
        );
      } else {
        return (
          <ListItem key={key} {...htmlAttributes}>
            {item.content}
          </ListItem>
        );
      }
    });

    return items;
  }

  render() {
    const { props } = this;
    const Tag = props.tag;

    // Uses all passed properties as attributes, excluding propTypes
    const htmlAttributes = Util.exclude(props, Object.keys(List.propTypes));

    if (props.transition) {
      return (
        <CSSTransitionGroup
          {...htmlAttributes}
          className={props.className}
          component={Tag}
          transitionName={props.transitionName}
          transitionEnterTimeout={props.transitionEnterTimeout}
          transitionLeaveTimeout={props.transitionLeaveTimeout}
        >
          {this.getListItems(props.content)}
        </CSSTransitionGroup>
      );
    }

    return (
      <Tag {...htmlAttributes} className={props.className}>
        {this.getListItems(props.content)}
      </Tag>
    );
  }
}

List.defaultProps = {
  className: "list",
  tag: "ul",
  transition: true,
  transitionName: "list-item",
  transitionEnterTimeout: 500,
  transitionLeaveTimeout: 500
};

List.propTypes = {
  className: PropTypes.string,
  // List of items in the list
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(
      // Each item in the array should be an object
      PropTypes.shape({
        // Optionally add a class to a given item
        className: PropTypes.string,
        // An item can be a container of another ist
        items: PropTypes.array,
        // Optional tag for item instead of an `li`
        tag: PropTypes.string,
        // If this item isn't a list of other items just use a value
        value: PropTypes.string
      })
    ),
    PropTypes.string
  ]).isRequired,
  // Optional tag for the container of the list
  tag: PropTypes.string,
  transition: PropTypes.bool,
  transitionName: PropTypes.string,
  // Transition lengths
  transitionEnterTimeout: PropTypes.number,
  transitionLeaveTimeout: PropTypes.number
};

module.exports = List;
