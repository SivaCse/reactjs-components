import classNames from "classnames";
/*eslint-disable no-unused-vars */
import React from "react";
/*eslint-enable no-unused-vars */

import FieldInput from "./FieldInput";
import IconEdit from "./icons/IconEdit";

const DEFAULT_PASSWORD_TEXT = "••••••";

const METHODS_TO_BIND = ["handleOnFocus"];

export default class FieldPassword extends FieldInput {
  constructor() {
    super();

    METHODS_TO_BIND.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  handleOnFocus(event) {
    if (!this.focused) {
      this.focused = true;
      this.forceUpdate();
    }

    this.props.handleEvent("focus", this.props.name, event);
  }

  getInputElement(attributes) {
    let classes = classNames(this.props.inputClass, this.props.sharedClass);
    attributes = this.bindEvents(attributes, this.props.handleEvent);
    attributes.onFocus = this.handleOnFocus;

    let startValue = DEFAULT_PASSWORD_TEXT;
    if (this.focused) {
      startValue = attributes.startValue;
    }

    if (this.isEditing() || this.props.writeType === "input") {
      return (
        <input
          ref="inputElement"
          className={classes}
          {...attributes}
          value={startValue} />
      );
    }

    return (
      <span
        ref="inputElement"
        {...attributes}
        className={classes}
        onClick={attributes.onFocus}>
        <span className={this.props.inlineTextClass}>
          {attributes.defaultPasswordValue || DEFAULT_PASSWORD_TEXT}
        </span>
        <span className={this.props.inlineIconClass}>
          <IconEdit />
        </span>
      </span>
    );
  }

}
