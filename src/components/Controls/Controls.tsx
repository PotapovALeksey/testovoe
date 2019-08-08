import * as React from "react";
import { debounce } from "lodash";
import "./input.css";

interface Props {
  onChange(value: string): void;
  clearItems(): void;
}

interface State {
  value: string;
}

class Controls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: "" };
  }
  private debouncedOnChange = debounce(
    value => this.props.onChange(value),
    1000
  );

  private handleValueChange = (value: string) => {
    this.setState({ value });
    this.debouncedOnChange(value);
  };

  private reset = () => {
    this.props.clearItems();
    this.setState({ value: "" });
  };

  public render() {
    const { value } = this.state;

    return (
      <div className="input-container">
        <input
          placeholder="Type keywords:"
          value={value}
          onChange={e => this.handleValueChange(e.target.value)}
        />
        <button type="submit" onClick={this.reset}>
          Clear
        </button>
      </div>
    );
  }
}

export default Controls;
