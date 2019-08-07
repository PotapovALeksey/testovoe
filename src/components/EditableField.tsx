import * as React from "react";

interface Props {
  value: number | string;
  handleChange(id: number, key: string, value: string): void;
  objKey: string;
  id: any;
}
interface State {
  editMode: boolean;
  value: any;
}
interface SyntheticEvent {
  code: string;
}

export default class EditableField extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { editMode: false, value: "" };
  }
  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.value !== this.props.value)
      this.setState({ value: this.props.value });

    if (this.state.editMode) {
      window.addEventListener("keydown", this.handleKeyPress);
      window.addEventListener("click", this.handleClickOtherArea);
    } else {
      window.removeEventListener("keydown", this.handleKeyPress);
      window.removeEventListener("click", this.handleClickOtherArea);
    }
  }

  onChangeMode = () => {
    this.setState({ editMode: true });
  };

  onChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ value: e.currentTarget.value });
  };
  changeStoreValue = () => {
    const { id, objKey } = this.props;
    const {value} = this.state;

    this.props.handleChange(id, objKey, value);
  };
  handleKeyPress = (event: SyntheticEvent): void => {
    if (event.code !== "Escape") return;
    this.setState({ editMode: false });
    this.changeStoreValue();
  };
  handleClickOtherArea = (e: any): void => {
    const current = e.target;
    const node = this.inputRef.current;
    console.log("node", node);
    console.log("current", current);
    if (node && node !== current) {
      this.setState({ editMode: false });
      this.changeStoreValue();
    }
  };

  private inputRef = React.createRef<HTMLInputElement>();

  render() {
    const { editMode, value } = this.state;
    return (
      <>
        <td onDoubleClick={this.onChangeMode}>
          {!editMode && value}
          {editMode && (
            <input
              ref={this.inputRef}
              value={value}
              onChange={this.onChangeValue}
            />
          )}
        </td>
      </>
    );
  }
}
