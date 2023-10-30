import { IDllSerializedList } from './dllSerialization';

export interface ISerializedHistory<T> {
  homePage: IDllSerializedList<T>;
  currentPage: IDllSerializedList<T>;
}

export interface ILocationState<T> {
  pathname: string;
  state: T | undefined;
}
