import * as React from "react";
import { Item } from "../stores/Data";
import EditableField from "./EditableField";
import "./table.css";

interface Props {
  items: Item[];
}
interface State {}

class Table extends React.Component<Props, State> {
  private renderItem = (item: Item, index: number) => {
    const keys = Object.keys(item);

    return (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <EditableField value={item.name} test={keys[0]} />
        <EditableField value={item.description} test={keys[1]}/>
        <EditableField value={item.githubURL} test={keys[2]}/>
        <EditableField value={item.updated} test={keys[3]}/>
        <EditableField value={item.homepage} test={keys[4]}/>
        <EditableField value={item.forks} test={keys[5]}/>
        <EditableField value={item.stars} test={keys[6]}/>
        <EditableField value={item.license} test={keys[7]}/>
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
        <table className="table">
          <thead>
            <tr>
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
