interface IDllSerializedNode<T> {
  key: string;
  value: T;
  prev: { key: string; value: T } | null;
  next: { key: string; value: T } | null;
}

type IDllSerializedList<T> = IDllSerializedNode<T>[];

export type { IDllSerializedNode, IDllSerializedList };
