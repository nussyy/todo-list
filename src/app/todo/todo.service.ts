import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Todo{
  id:number;
  title:string;
  status: 'To Do'| 'In Progress' | 'Done';
  date?: Date ;
  description?: string;

}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Todo[]=[
    {id:1, title :'Task1', status : 'To Do'},
    {id:2, title :'Task2', status : 'In Progress', date : new Date()},
    {id:3, title :'Task3', status : 'Done'},


  ];
  
  getTodos(): Observable<Todo[]>{
    return of(this.todos);
  }

  addTodo(todo: Todo):Observable<void>{
    this.todos=[...this.todos, { ...todo, id: Date.now()}];
    return of(undefined);
  }

  deleteTodo(id: number): Observable<void>{
    this.todos =this.todos.filter(todo => todo.id !== id);
    return of(undefined);
  }

  filterTodos(
    todos:Todo[],
      filterDate?: Date | null,
      filterStatus : 'All' | 'To Do' | 'In Progress' | 'Done'= 'All',
      searchTerm :string =''
    ): Todo []{
      return todos.filter(todo =>{
        if(filterDate && todo.date && todo.date < filterDate)
{
  return false;
}   

if (filterStatus !== 'All' && todo.status ! == filterStatus){
  return false;

}

if (searchTerm && !todo.title.toLowerCase().includes (searchTerm.toLocaleLowerCase())){
  return false;
}
return true;

});

    }
    
  
}
