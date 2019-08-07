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

export interface IFuncProps {
  id: number;
  key: string;
  value: string;
}

class Data {
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
  public changeFieldData(id: number, key: string, value: string) {
    const newData: any = this._items.map((el: Item) =>
      el.id === id ? { ...el, ...{ [key]: value } } : el
    );
    this._items = newData;
  }
  @action.bound
  public deletedItemData(deletedItem: number[]) {
    const newData: any = this._items.filter(
      (el: Item) => !deletedItem.includes(el.id)
    );
    this._items = newData;
  }
}

export default Data;
