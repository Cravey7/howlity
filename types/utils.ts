/**
 * Utility type definitions for common patterns
 */

/**
 * Makes all properties of an object optional
 */
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Makes all properties of an object required
 */
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * Makes all properties of an object readonly
 */
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * Picks specific properties from an object
 */
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Omits specific properties from an object
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Extracts the type of a promise
 */
export type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

/**
 * Extracts the type of an array
 */
export type ArrayType<T extends Array<any>> = T extends Array<infer U> ? U : never;

/**
 * Makes all properties of an object nullable
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/**
 * Makes all properties of an object optional and nullable
 */
export type OptionalNullable<T> = {
  [P in keyof T]?: T[P] | null;
};

/**
 * Creates a type with all properties of T except those in K
 */
export type Exclude<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Creates a type with only the properties of T that are in K
 */
export type Extract<T, K extends keyof T> = Pick<T, Extract<keyof T, K>>;

/**
 * Creates a type with all properties of T that are not in K
 */
export type OmitBy<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

/**
 * Creates a type with only the properties of T that are in K
 */
export type PickBy<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Creates a type with all properties of T that are not in K
 */
export type ExcludeBy<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

/**
 * Creates a type with only the properties of T that are in K
 */
export type ExtractBy<T, K extends keyof T> = {
  [P in Extract<keyof T, K>]: T[P];
};

/**
 * Creates a type with all properties of T that are not in K
 */
export type OmitByValue<T, K> = {
  [P in keyof T as T[P] extends K ? never : P]: T[P];
};

/**
 * Creates a type with only the properties of T that are in K
 */
export type PickByValue<T, K> = {
  [P in keyof T as T[P] extends K ? P : never]: T[P];
};

/**
 * Creates a type with all properties of T that are not in K
 */
export type ExcludeByValue<T, K> = {
  [P in keyof T as T[P] extends K ? never : P]: T[P];
};

/**
 * Creates a type with only the properties of T that are in K
 */
export type ExtractByValue<T, K> = {
  [P in keyof T as T[P] extends K ? P : never]: T[P];
};

/**
 * Creates a type with all properties of T that are not in K
 */
export type OmitByKey<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

/**
 * Creates a type with only the properties of T that are in K
 */
export type PickByKey<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Creates a type with all properties of T that are not in K
 */
export type ExcludeByKey<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

/**
 * Creates a type with only the properties of T that are in K
 */
export type ExtractByKey<T, K extends keyof T> = {
  [P in Extract<keyof T, K>]: T[P];
};
