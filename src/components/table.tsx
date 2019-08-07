import * as React from "react";
import { Item } from "../stores/Data";
import EditableField from "./EditableField";
import Checkbox from "./Checkbox";
import "./table.css";

interface Props {
  items: Item[];
  handleChange(id: number, key: string, value: string): void;
  handleDelete(deletedItems: number[]): void;
}
interface State {
  deletedItems: number[];
}

class Table extends React.Component<Props, State> {
  state = {
    deletedItems: []
  };

  onChangeSelectedAll = () => {
    const itemsId = this.props.items.map(el => el.id);
    this.setState({ deletedItems: itemsId });
  };

  onChangeUnselectedAll = () => {
    this.setState({ deletedItems: [] });
  };
  onClickDelete = () => {
    const { handleDelete } = this.props;
    const { deletedItems } = this.state;

    handleDelete(deletedItems);
  };

  handleChangeCheckbox = (id: number) => {
    const { deletedItems } = this.state;
    if (deletedItems.find(el => el === id)) {
      this.setState(prevState => ({
        deletedItems: prevState.deletedItems.filter(el => el !== id)
      }));
    } else {
      this.setState(prevState => ({
        deletedItems: [...prevState.deletedItems, id]
      }));
    }
  };
  private renderItem = (item: Item, index: number) => {
    const keys = Object.keys(item);
    const { deletedItems } = this.state;
    const isCheked = deletedItems.find(el => el === item.id);

    return (
      <tr key={item.id}>
        <td>
          <Checkbox
            onChange={() => this.handleChangeCheckbox(item.id)}
            checked={isCheked}
          />
        </td>
        <td>{index + 1}</td>
        <EditableField
          value={item.name}
          objKey={keys[1]}
          id={item.id}
          handleChange={this.props.handleChange}
        />
        <EditableField
          value={item.description}
          objKey={keys[2]}
          id={item.id}
          handleChange={this.props.handleChange}
        />
        <EditableField
          value={item.githubURL}
          objKey={keys[3]}
          id={item.id}
          handleChange={this.props.handleChange}
        />
        <EditableField
          value={item.updated}
          objKey={keys[4]}
          id={item.id}
          handleChange={this.props.handleChange}
        />
        <EditableField
          value={item.homepage}
          objKey={keys[5]}
          id={item.id}
          handleChange={this.props.handleChange}
        />
        <EditableField
          value={item.forks}
          objKey={keys[6]}
          id={item.id}
          handleChange={this.props.handleChange}
        />
        <EditableField
          value={item.stars}
          objKey={keys[7]}
          id={item.id}
          handleChange={this.props.handleChange}
        />
        <EditableField
          value={item.license}
          objKey={keys[8]}
          id={item.id}
          handleChange={this.props.handleChange}
        />
      </tr>
    );
  };

  public render() {
    const { items } = this.props;

    if (items.length === 0) {
      return null;
    }

    return (
      <div className="table-container">
        <div>
          <label>
            <input
              type="checkbox"
              checked={this.state.deletedItems.length === items.length}
              onChange={this.onChangeSelectedAll}
            />
            <span>Select all</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={this.state.deletedItems.length === 0}
              onChange={this.onChangeUnselectedAll}
            />
            <span>Unselect all</span>
          </label>
          {this.state.deletedItems.length !== 0 && (
            <button onClick={this.onClickDelete}>Deleted</button>
          )}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Deleted</th>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>GitHub URL</th>
              <th>Updated</th>
              <th>Homepage</th>
              <th>Forks count</th>
              <th>Stars count</th>
              <th>License</th>
            </tr>
          </thead>
          <tbody>{items.map(this.renderItem)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
