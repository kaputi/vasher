type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

export class Instance {
  public loaded: boolean = false;
  public data: TypedArray | undefined;
  private url: string;
  public priority: number = 3;

  constructor(public readonly instanceID: string) {
    this.url = '';
  }
}
