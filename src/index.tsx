import React, { Component } from "react";
import { render } from "react-dom";
import { observer } from "mobx-react";
import Data from "./stores/Data";
import Table from "./components/Table/Table";
import Controls from "./components/Controls/Controls";
import Button from "./components/ButtonDownload/ButtonDownload";
import "./styles.css";

interface AppProps {}
interface AppState {}

@observer
class App extends Component<AppProps, AppState> {
  public store: Data;

  constructor(props: AppProps) {
    super(props);
    this.store = new Data();
  }

  private search = (query: string) => {
    this.store.get(query);
  };

  private resetItems = () => {
    this.store.clearItems();
  };

  private changeFieldData = (id: number, key: string, value: string) => {
    this.store.changeFieldData(id, key, value);
  };

  private deletedItem = (deletedItem: number[]) => {
    this.store.deletedItemData(deletedItem);
  };

  private sortedFiledsData = (key: string) => {
    this.store.sortedData(key);
  };
  render() {
    return (
      <div className="app">
        <Controls onChange={this.search} clearItems={this.resetItems} />
        <Button items={this.store.repositories} />
        <Table
          items={this.store.repositories}
          onChangeFields={this.changeFieldData}
          onClickDelete={this.deletedItem}
          onClickSorted={this.sortedFiledsData}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
