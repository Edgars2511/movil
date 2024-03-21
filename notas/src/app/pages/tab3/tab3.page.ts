import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TopLevel } from '../../interfaces/index';
import { Task } from 'src/app/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  public resp: TopLevel[] = [];
  public tasks: Task[] = [];

  constructor(private newService: ApiService) {}

  ngOnInit() {
    this.newService.get5Notas().subscribe(resp => {
      console.log(resp);
      if (Array.isArray(resp)) {
        this.resp = resp;
      } else {
        this.resp = [resp];
      }
    });

    // Llamada al método para obtener las tareas
    this.newService.getTasks().subscribe(tasks => {
      console.log(tasks);
      if (Array.isArray(tasks)) {
        this.tasks = tasks;
      } else {
        this.tasks = [tasks];
      }
    });

  }
}
