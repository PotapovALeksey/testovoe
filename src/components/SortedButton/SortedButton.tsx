import React, { Component } from "react";

interface Props {
  onClick(): void;
}
interface State {}

export default class SortedButton extends Component<Props, State> {
  state = {};
  render() {
    const { onClick } = this.props;
    return <button onClick={onClick}>sort</button>;
  }
}
