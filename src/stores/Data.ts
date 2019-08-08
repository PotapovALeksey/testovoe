import { action, observable, computed, toJS } from "mobx";
import { searchRepositories } from "../middlewares/api";

export interface Item {
  id: number;
  name: string;
  description: string;
  githubURL: string;
  homepage: string;
  license: string;
  stars: number;
  forks: number;
  updated: string;
}

interface State {
  column: string;
  dir: boolean;
}

class Data {
  state: State = {
    column: "",
    dir: true
  };
  @observable private _items = [];

  @computed public get repositories() {
    return toJS(this._items);
  }

  private static parseItem(item: { [key: string]: any }): Item {
    return {
      id: item.id,
      name: item.full_name,
      description: item.description,
      githubURL: item.html_url,
      homepage: item.homepage,
      license: item.license ? item.license.name : "",
      stars: item.stargazers_count,
      forks: item.forks_count,
      updated: item.updated_at
    };
  }

  @action.bound
  public async get(query: string) {
    const { data } = await searchRepositories(query);

    this._items = data.items.map(Data.parseItem);
  }

  @action.bound
  public clearItems() {
    this._items = [];
  }
  @action.bound
  public changeFieldData(id: number, key: string ,value: string ) {
    const newData: any = this._items.map((el: Item) => {
      const e: Item = el.id === id ? { ...el, ...{ [key]: value } } : el;

      return e;
    });
    this._items = newData;
  }
  @action.bound
  public deletedItemData(deletedItem: number[]) {
    const newData: any = this._items.filter(
      (el: Item) => !deletedItem.includes(el.id)
    );
    this._items = newData;
  }
  @action.bound
  public sortedData(key: string) {
    if (key === this.state.column) this.state.dir = !this.state.dir;
    this.state.column = key;

    const newData: any = [...this._items].sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";
      if (
        key === "name" ||
        key === "description" ||
        key === "license" ||
        key === "homepage"
      ) {
        aValue = String(a[key]).toLocaleLowerCase();
        bValue = String(b[key]).toLocaleLowerCase();

        return (this.state.dir ? aValue > bValue : aValue < bValue) ? 1 : -1;
      }
      if (key === "updated") {
        aValue = new Date(String(a[key])).getTime();
        bValue = new Date(String(b[key])).getTime();

        return this.state.dir ? aValue - bValue : bValue - aValue;
      }
      if (key === "forks" || key === "stars") {
        aValue = a[key];
        bValue = b[key];

        return this.state.dir ? aValue - bValue : bValue - aValue;
      }

      if (key === "githubURL") {
        aValue = String(a[key])
          .replace("https://github.com/", "")
          .toLocaleLowerCase();
        bValue = String(b[key])
          .replace("https://github.com/", "")
          .toLocaleLowerCase();
        return (this.state.dir ? aValue > bValue : aValue < bValue) ? 1 : -1;
      }

      return -1;
    });

    this._items = newData;
  }
}

export default Data;
