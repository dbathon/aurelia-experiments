import { Aurelia } from 'aurelia-framework';

import '../styles/styles.scss';

// declare webpack define
declare const __DEV__: boolean;


// log dirty checking required
import * as Bind from 'aurelia-binding';
import * as LogManager from 'aurelia-logging';

const logger = LogManager.getLogger('dirty-check-warn');

let DirtyCheckProperty: any = (<any>Bind)["DirtyCheckProperty"];

DirtyCheckProperty.prototype.standardSubscribe = DirtyCheckProperty.prototype.subscribe;
DirtyCheckProperty.prototype.subscribe = function (context: any, callable: any) {
  this.standardSubscribe(context, callable);

  logger.warn(`'${this.obj.constructor.name}.${this.propertyName}' is being dirty checked`, this.obj);
};


// setup Bluebird
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

export async function configure(aurelia: Aurelia) {
  aurelia.use.standardConfiguration();

  if (__DEV__) {
    aurelia.use.developmentLogging();
  }

  await aurelia.start();
  aurelia.setRoot('app');
}
