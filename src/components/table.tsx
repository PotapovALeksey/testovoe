import * as React from "react";
import { Item } from "../stores/Data";
import "./table.css";

interface Props {
  items: Item[];
}
interface State {}

class Table extends React.Component<Props, State> {
  // constructor(props: Props) {
  //   super(props);
  // }

  private renderItem = (item: Item, index: number) => {
    return (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.githubURL}</td>
        <td>{item.updated}</td>
        <td>{item.homepage}</td>
        <td>{item.forks}</td>
        <td>{item.stars}</td>
        <td>{item.license}</td>
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
