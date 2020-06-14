import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css']
})
export class ToDosComponent implements OnInit {
  todos:Todo[];
  todo: any;

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos=> {
        this.todos =todos;
    });     //promises
  }

  deleteTodo(todo:Todo){
    //remove from UI
    this.todos = this.todos.filter(t=>t.id !==todo.id);
    //remove from server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo){
    this.todoService.addTodo(todo).subscribe(todo=>{
      this.todos.push(todo);
    });
  }

}
