import { MODULES } from './modules';
import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration, RouteConfig } from 'aurelia-router';

export class App {
  router: Router;

  private buildRoutes(): RouteConfig[] {
    return MODULES.map(module =>
      ({ route: module.key, name: module.key, moduleId: './' + module.moduleId, nav: true, title: module.title })
    )
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia Experiments';
    config.map([
      { route: ['', '*any'], redirect: 'game-of-life' },
      ...this.buildRoutes()
    ]);

    this.router = router;
  }
}
