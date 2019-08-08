import * as React from "react";
interface Props {
  onChange(): void;
  checked: boolean | undefined;
}
interface State {
  checked: boolean;
}
export default class Checkbox extends React.Component<Props, State> {
  state = {
    checked: false
  };
  componentDidUpdate(prevProps: Props) {
    if (prevProps.checked !== this.props.checked) {
      this.props.checked
        ? this.setState({ checked: true })
        : this.setState({ checked: false });
    }
  }
  onChange = () => {
    this.setState({ checked: !this.state.checked });
  };
  handleChange = () => {
    this.onChange();
    this.props.onChange();
  };
  render() {
    const { checked } = this.state;
    return (
      <input onChange={this.handleChange} checked={checked} type="checkbox" />
    );
  }
}
