import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from './todo.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

interface Todo{
  id:number;
  title:string;
  status: 'To Do' | 'In Progress'| 'Done';
  date?: Date;
  description?: string;

}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  standalone:true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],

})
export class TodoComponent implements OnInit {
  todos: Todo[]=[];
  newTodoForm! : FormGroup;
  filterDate:Date| null=null;
  filterStatus:'All' | 'To Do' | 'In Progress'|'Done' = 'All';
  searchTerm:string='';

  constructor(private todoService: TodoService){}

  ngOnInit() {

    this.newTodoForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      status: new FormControl ('To Do'),
      date: new FormControl(null),
      description: new FormControl('')
    });

    this.fetchTodos();
  }

  fetchTodos(){
    this.todoService.getTodos()
    .subscribe(todos =>{
      this.todos =todos;
      this.filterTodos();

    });
  }

  addTodo(){
    if 
    (this.newTodoForm.valid){
      const newTodo = {

      ... this.newTodoForm.value };
      console.log('Form data before adding:', newTodo);
      
      this.todoService.addTodo(newTodo)
      .subscribe(()=>{
        this.fetchTodos();
        this.newTodoForm.reset();
      });
    }
  }

  deleteTodo(todo:Todo){
    this.todoService.deleteTodo(todo.id)
    .subscribe(() => this.fetchTodos());
  }

  filterTodos(){
    this.todos=this.todoService.filterTodos(
      this.todos,
      this.filterDate,
      this.filterStatus,
      this.searchTerm
    );
  }

  clearFilters(){
    this.filterDate=null;
    this.filterStatus="All";
    this.searchTerm = '';
    this.filterTodos();
  }
  trackTodo(index: number, todo: Todo): any {
    return todo.id;
  }

}



