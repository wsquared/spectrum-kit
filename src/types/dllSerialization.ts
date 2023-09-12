interface IDllSerializedNode<T> {
  value: T;
  prev: T | null;
  next: T | null;
}

type IDllSerializedList<T> = IDllSerializedNode<T>[];

export type { IDllSerializedNode, IDllSerializedList };
