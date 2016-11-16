import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia Experiments';
    config.map([
      { route: ['', '*any'], redirect: 'game-of-life' },
      { route: 'game-of-life', name: 'game-of-life', moduleId: './game-of-life/game-of-life-game', nav: true, title: 'Game of Life' },
      { route: 'nurikabe', name: 'nurikabe', moduleId: './nurikabe/nurikabe-board', nav: true, title: 'Nurikabe' },
      { route: 'todo', name: 'todo', moduleId: './todo/todo', nav: true, title: 'Todo' },
      { route: 'misc', name: 'misc', moduleId: './misc/misc', nav: true, title: 'Misc' },
    ]);

    this.router = router;
  }
}
