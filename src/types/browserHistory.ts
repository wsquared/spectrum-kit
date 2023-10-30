import { IDllSerializedList } from './dllSerialization';

export interface ILocationState<T> {
  pathname: string;
  state: T;
}

export interface ISerializedHistory<T> {
  homePage: IDllSerializedList<ILocationState<T>>;
  currentPage: IDllSerializedList<ILocationState<T>>;
}
