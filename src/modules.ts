
export class Module {
  constructor(public readonly key: string, public readonly title: string, public readonly moduleId: string = `${key}/${key}`) { }
}

export const MODULES: Module[] = [
  new Module('game-of-life', 'Game of Life', 'game-of-life/game-of-life-game'),
  new Module('nurikabe', 'Nurikabe', 'nurikabe/nurikabe-board'),
  new Module('todo', 'Todo'),
  new Module('compose-test', 'Compose Test'),
  new Module('misc', 'Misc')
]