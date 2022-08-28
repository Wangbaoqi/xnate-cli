export declare const getPublicDirs: (dir: string) => Promise<string[]>;
export declare const isPublicDir: (fnSource: string[], dir: string) => boolean;
export declare const isMd: (file: string) => boolean;
export declare const isDir: (file: string) => boolean;
export declare const isJSX: (file: string) => boolean;
export declare const outputFileSyncOnChange: (path: string, code: string) => void;
export declare const glob: (pattern: string) => Promise<string[]>;
