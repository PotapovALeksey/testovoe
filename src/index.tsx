import React, { Component } from "react";
import { render } from "react-dom";
import { observer } from "mobx-react";
import Data from "./stores/Data";
import Table from "./components/table";
import Input from "./components/input";
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

  render() {
    return (
      <div className="app">
        <Input onChange={this.search} />
        <Table items={this.store.repositories} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
