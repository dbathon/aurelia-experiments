import { Module, MODULES } from '../modules';

class ModuleTab {
  constructor(public readonly module: Module) { }
}

export class GameOfLifeGame {
  tabs: ModuleTab[] = [];
  activeTab?: ModuleTab;

  readonly availableModules: Module[] = MODULES;

  addModule(module: Module) {
    let newTab = new ModuleTab(module);
    this.tabs.push(newTab);
    this.setActive(newTab);
  }

  setActive(tab: ModuleTab) {
    this.activeTab = tab;
  }

  removeTab(tab: ModuleTab) {
    let index = this.tabs.indexOf(tab);
    if (index !== -1) {
      this.tabs.splice(index, 1);
      if (this.activeTab === tab) {
        this.activeTab = undefined;
        if (this.tabs.length > 0) {
          this.setActive(this.tabs[Math.min(index, this.tabs.length - 1)]);
        }
      }
    }
  }
}