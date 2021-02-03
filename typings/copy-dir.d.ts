declare interface Opt {
  utimes?: boolean; // def:false, Boolean | Object, keep addTime or modifyTime if true
  mode?: boolean; // def:false, Boolean | Number, keep file mode if true
  cover?: boolean; // def:true, Boolean, cover if file exists
  filter?: boolean; // def:true, Boolean | Function, file filter
}

interface copydirSync {
  (from: string, to: string, options?: Opt): void;
  (from: string, to: string, callback: (err?: Error) => void): void;
  (
    from: string,
    to: string,
    options: Opt,
    callback: (err?: Error) => void
  ): void;
}

interface Copydir {
  (from: string, to: string, options?: Opt): void;
  (from: string, to: string, callback: (err?: Error) => void): void;
  (
    from: string,
    to: string,
    options: Opt,
    callback: (err?: Error) => void
  ): void;
  sync: copydirSync;
}

const copydir: Copydir;

export = copydir;
