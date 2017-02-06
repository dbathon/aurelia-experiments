import { Module } from '../modules';
import { bindable } from 'aurelia-framework';

// this basically exists to wrap the compose tag, to avoid access to outer model values...
export class ModuleTabContent {

  @bindable
  module: Module;

}