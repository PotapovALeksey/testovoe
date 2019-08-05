import React, { Component } from "react";
import { render } from "react-dom";
import { observer } from "mobx-react";
import Data from "./stores/Data";
import Table from "./components/table";
import Controls from "./components/Controls";
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

  render() {
    return (
      <div className="app">
        <Controls onChange={this.search} clearItems={this.resetItems} />
        <Table items={this.store.repositories} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
