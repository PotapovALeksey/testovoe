import * as React from "react";
import "./input.css";

interface Props {
  onChange(value: string): void;
}

interface State {
  value: string;
}

class Input extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: "" };
  }

  private handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ value });
    this.props.onChange(value);
  };

  public render() {
    const { value } = this.state;

    return (
      <div className="input-container">
        <input
          placeholder="Type keywords:"
          value={value}
          onChange={this.handleValueChange}
        />
      </div>
    );
  }
}

export default Input;
