import Service from '@ember/service';
export { default as inject } from './inject';

export default function (method) {
  return Service.extend({ execute: method });
}
