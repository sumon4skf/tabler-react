// @flow

import * as React from "react";
import { Icon } from "../";
import cn from "classnames";

type FormStyle = {|
  +className?: string,
  +icon?: string,
  +position?: "append" | "prepend",
  +valid?: boolean,
  +tick?: boolean,
  +invalid?: boolean,
  +cross?: boolean,
  +feedback?: string,
  +type?: string,
  +placeholder?: string,
  +name?: string,
  +value?: string | number,
  +disabled?: boolean,
  +readOnly?: boolean,
  +checked?: boolean,
|};

export type Props = {|
  ...FormStyle,
  +onChange?: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  +onBlur?: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  +placeholder?: string,
  +type?: "checkbox" | "radio" | "text" | "email" | "password",
  +value?: string | number | boolean,
|};

function FormInput(props: Props): React.Node {
  const {
    className,
    name,
    icon,
    position = "prepend",
    valid,
    tick,
    invalid,
    cross,
    feedback,
    placeholder,
    value,
    checked,
    onChange,
    onBlur,
    disabled,
    readOnly,
  } = props;
  const type = props.type || "text";

  const classes = cn(
    {
      "form-control": type !== "checkbox" && type !== "radio",
      "custom-control-input": type === "checkbox" || type === "radio",
      "is-valid": valid,
      "state-valid": tick,
      "is-invalid": invalid,
      "state-invalid": cross,
    },
    className
  );

  const allInputProps = {
    name,
    className: classes,
    type,
    placeholder,
    value,
    disabled,
    readOnly,
    onChange,
    onBlur,
  };

  return !icon ? (
    <React.Fragment>
      {type === "checkbox" || type === "radio" ? (
        <input {...allInputProps} checked={checked} />
      ) : (
        <input {...allInputProps} />
      )}
      {feedback &&
        (invalid || cross) && (
          <span className="invalid-feedback">{feedback}</span>
        )}
    </React.Fragment>
  ) : (
    <div className="input-icon">
      {position === "prepend" && (
        <span className="input-icon-addon">
          <Icon name={icon} />
        </span>
      )}
      <input {...allInputProps} />
      {position === "append" && (
        <span className="input-icon-addon">
          <Icon name={icon} />
        </span>
      )}
    </div>
  );
}

FormInput.displayName = "Form.Input";

/** @component */
export default FormInput;
