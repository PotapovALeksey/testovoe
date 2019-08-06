import * as React from "react";
import { Item } from "../stores/Data";

interface Props {
  items: Item[];
}

interface State {
  href: string;
}

export default class ButtonLoad extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { href: "" };
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.items !== this.props.items) {
      this.setState({
        href:
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(this.props.items))
      });
    }
  }

  public render() {
    const { href } = this.state;
    return (
      <>
        <a href={href} download="users.json">
          Download JSON
        </a>
      </>
    );
  }
}
