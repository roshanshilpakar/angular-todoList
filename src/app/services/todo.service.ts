import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Todo } from '../models/Todo'
import { Observable } from 'rxjs';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'

  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoUrl:string='http://jsonplaceholder.typicode.com/todos?_limit=5';
  todosLimit = '?_limit=5';
  todosUrl: any;

  constructor(private http:HttpClient) { }

  //get todos
  getTodos():Observable<Todo[]>{
     return this.http.get<Todo[]>(`${this.todoUrl} ${this.todosLimit}`);
    
  }

  //toggle completed
  toggleCompleted(todo:Todo):Observable<any>{
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions)
  }

  //delete todo
  deleteTodo(todo:Todo):Observable<Todo>{
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url,httpOptions);

  }

  //add Todo
  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.todoUrl,todo,httpOptions);
  }
}
