import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabelaComponent } from './components/tabela/tabela.component';
import { ModalComponent } from './components/modal/modal.component';
import { ServiceService } from './services/service.service';
import { Observable } from 'rxjs';
import { Tipo } from './models/tipo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TabelaComponent,ModalComponent],
  template: `<app-tabela [data]="data()" [columns]="columns" (rowSelected)="showModal($event)"/>
              <app-modal [visible]="display" [header]="'Detalhes'" [data]="selectedItem" [columns]="columns" (visibleChange)="handleVisibleChange($event)">`,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  tipo$! : Observable<Tipo[]>;
  tipoList = signal<null | Tipo[]>(null);
  tipo = signal<null | Tipo>(null);
  #service= inject(ServiceService)


  data = signal<Tipo[]>([]) ;

  columns = [
    { field: 'revisao', header: 'Revisão'},
    { field: 'nome', header: 'Nome' },
    { field: 'idEndereco', header: 'ID Endereço' },
    { field: 'banco_associado', header: 'Banco Associado' },
    { field: 'dataAlteracao', header: 'Data de Alteração',type: 'date', format: 'dd-MM-yyyy' }
    
  ];

  ngOnInit(): void {
 
     this.#service.getAll().subscribe({
     next: (next)=> {
       this.data.set(next);
     },
     error:(err)=>console.log(err)
    });

     this.#service.getTwoRev("1","2").subscribe({
     next: (next)=> {
       console.log(next)
     },
     error:(err)=>console.log(err)
    });


  }


  display: boolean = false;
  selectedItem: any;

  showModal(item: any) {
    this.selectedItem = item;
    this.display = true;
  }
  hideModal() {
    this.display = false;
  }

  handleVisibleChange(visible: boolean) {
    this.display = visible;
  }
}


