import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  tasks: Array<Task> = [];
  newTask = '';
  ola = '';

  addTask(): void {
    if (!this.newTask.trim()) return;
    this.tasks.push({ title: this.newTask.trim(), completed: false });
    this.newTask = '';
  }

  removeTask(taskToRemove: Task): void {
    this.tasks = this.tasks.filter(task => task !== taskToRemove);
  }
}
