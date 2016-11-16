import {bindable} from 'aurelia-framework';

class TodoItem {
  done = false;

  constructor(public description: string) { }
}

export class Todo {
  todos: TodoItem[] = [];
  todoDescription = '';

  addTodo() {
    if (this.todoDescription) {
      this.todos.push(new TodoItem(this.todoDescription));
      this.todoDescription = '';
    }
  }

  removeTodo(todo: TodoItem) {
    let index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
}
