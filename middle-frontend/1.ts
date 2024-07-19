type GetByKey<O extends object, K extends PropertyKey> = K extends keyof O
  ? O[K]
  : undefined;

type GetByPath<
  O extends object,
  P extends string,
> = P extends `${infer K}.${infer R}`
  ? GetByKey<O, K> extends object
    ? GetByPath<GetByKey<O, K>, R>
    : undefined
  : GetByKey<O, P>;

function isObject(object: unknown): object is object {
  return Object.prototype.toString.call(object) === '[object Object]';
}

function isKeyInObject<O extends object>(
  key: PropertyKey,
  object: O,
): key is keyof O {
  return key in object;
}

/** @see https://github.com/MihailStar/praktikum-test/blob/master/02/index.js */
export function get<O extends object, P extends string, D = undefined>(
  object: O,
  path: P,
  defaultValue?: D,
): GetByPath<O, P> extends undefined ? D : GetByPath<O, P> {
  const keys = path.split('.');
  let value: any = object;

  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];

    if (!isObject(value) || !isKeyInObject(key, value)) {
      value = undefined;
      break;
    }

    value = value[key];
  }

  return value === undefined ? defaultValue : value;
}
