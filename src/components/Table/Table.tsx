import * as React from "react";
import { Item } from "../../stores/Data";
import EditableField from "../EditableField/EditableField";
import Checkbox from "../Checkbox/Checkbox";
import SortedButton from "../SortedButton/SortedButton";
import "./table.css";

interface Props {
  items: Item[];
  onChangeFields(id: number, key: string, value: string): void;
  onClickDelete(deletedItems: number[]): void;
  onClickSorted(key: string): void;
}
interface State {
  deletedItems: number[];
  userSelected: number[];
}

class Table extends React.Component<Props, State> {
  state = {
    deletedItems: [],
    userSelected: []
  };

  onChangeSelectedAll = () => {
    const { deletedItems, userSelected } = this.state;
    const { items } = this.props;
    if (deletedItems.length === items.length) {
      userSelected.length !== 0
        ? this.setState({ deletedItems: [...userSelected] })
        : this.setState({ deletedItems: [] });
      return;
    }

    const itemsId = items.map(el => el.id);
    this.setState({ deletedItems: itemsId });
  };

  onChangeUnselectedAll = () => {
    this.setState({ deletedItems: [], userSelected: [] });
  };
  onClickDelete = () => {
    const { onClickDelete } = this.props;
    const { deletedItems } = this.state;

    onClickDelete(deletedItems);
    this.onChangeUnselectedAll();
  };

  handleChangeCheckbox = (id: number) => {
    const { deletedItems } = this.state;
    if (deletedItems.find(el => el === id)) {
      this.setState(prevState => ({
        deletedItems: prevState.deletedItems.filter(el => el !== id),
        userSelected: prevState.userSelected.filter(el => el !== id)
      }));
    } else {
      this.setState(prevState => ({
        deletedItems: [...prevState.deletedItems, id],
        userSelected: [...prevState.userSelected, id]
      }));
    }
  };
  private renderItem = (item: Item, index: number) => {
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
          handleChange={value => {
            const id = item.id;
            const objKey = "name";

            this.props.onChangeFields(id, objKey, value);
          }}
        />
        <EditableField
          value={item.description}
          handleChange={value => {
            const id = item.id;
            const objKey = "description";

            this.props.onChangeFields(id, objKey, value);
          }}
        />
        <EditableField
          value={item.githubURL}
          handleChange={value => {
            const id = item.id;
            const objKey = "githubURL";

            this.props.onChangeFields(id, objKey, value);
          }}
        />
        <EditableField
          value={item.updated}
          handleChange={value => {
            const id = item.id;
            const objKey = "updated";

            this.props.onChangeFields(id, objKey, value);
          }}
        />
        <EditableField
          value={item.homepage}
          handleChange={value => {
            const id = item.id;
            const objKey = "homepage";

            this.props.onChangeFields(id, objKey, value);
          }}
        />
        <EditableField
          value={item.forks}
          handleChange={value => {
            const id = item.id;
            const objKey = "forks";

            this.props.onChangeFields(id, objKey, value);
          }}
        />
        <EditableField
          value={item.stars}
          handleChange={value => {
            const id = item.id;
            const objKey = "stars";

            this.props.onChangeFields(id, objKey, value);
          }}
        />
        <EditableField
          value={item.license}
          handleChange={value => {
            const id = item.id;
            const objKey = "license";

            this.props.onChangeFields(id, objKey, value);
          }}
        />
      </tr>
    );
  };

  public render() {
    const { items, onClickSorted } = this.props;

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
            <button onClick={this.onClickDelete}>Delete selected</button>
          )}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Deleted</th>
              <th>#</th>
              <th>
                Name <SortedButton onClick={() => onClickSorted("name")} />
              </th>
              <th>
                Description{" "}
                <SortedButton onClick={() => onClickSorted("description")} />
              </th>
              <th>
                GitHub URL{" "}
                <SortedButton onClick={() => onClickSorted("githubURL")} />{" "}
              </th>
              <th>
                Updated{" "}
                <SortedButton onClick={() => onClickSorted("updated")} />
              </th>
              <th>
                Homepage
                <SortedButton onClick={() => onClickSorted("homepage")} />
              </th>
              <th>
                Forks count{" "}
                <SortedButton onClick={() => onClickSorted("forks")} />
              </th>
              <th>
                Stars count{" "}
                <SortedButton onClick={() => onClickSorted("stars")} />
              </th>
              <th>
                License{" "}
                <SortedButton onClick={() => onClickSorted("license")} />
              </th>
            </tr>
          </thead>
          <tbody>{items.map(this.renderItem)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
