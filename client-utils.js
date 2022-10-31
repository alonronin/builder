import React from 'react';
import components from './components';

export function getComponent(type, component) {
  if (type === 'CustomComponent') {
    return new Function('React', `return ${component}`)(React);
  }
  return components[type];
}
