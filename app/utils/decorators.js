import { tracked } from '@glimmer/tracking';

// from https://github.com/NullVoxPopuli/emberclear/blob/upgrade-ember-source/packages/frontend/src/utils/decorators.ts
export function inLocalStorage( target, propertyKey, descriptor ) {
  const targetName = target.constructor.name;
  const {
    get: oldGet,
    set: oldSet
  } = tracked(target, propertyKey, descriptor);

  const newDescriptor = {
    confgurable: true,
    enumerable: true,
    get: function() {
      const key = `${targetName}-${propertyKey}`;
      const initialValue = oldGet.call(this);
      const lsValue = localStorage.getItem(key);
      const json = (lsValue && JSON.parse(lsValue)) || { value: initialValue };

      return json.value;
    },
    set: function(value) {
      const key = `${targetName}-${propertyKey}`;
      const lsValue = JSON.stringify({ value });

      localStorage.setItem(key, lsValue);

      // this is required to dirty the change tracking system
      oldSet.call(this, value);
    },
  };

  return newDescriptor;
}

export function setHtmlClass(target, propertyKey, descriptor) {
  const { set: oldSet, get: oldGet } = descriptor;

  let init = oldGet.call(descriptor);
  document.documentElement.classList = [init];

  descriptor.set = function(value) {
    oldSet.call(this, value);
    document.documentElement.classList = [value];
  };
}
