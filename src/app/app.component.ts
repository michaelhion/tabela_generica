import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabelaComponent } from './components/tabela/tabela.component';
import { ModalComponent } from './components/modal/modal.component';
import { ServiceService } from './services/service.service';
import { Observable } from 'rxjs';
import { Detalhe, Tipo } from './models/tipo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabelaComponent, ModalComponent],
  template: `<app-tabela
      [data]="data()"
      [columns]="columns"
      (rowSelected)="showModal($event)"
    />
    <app-modal
      [visible]="display"
      [header]="'Detalhes'"
      [data]="modalData()"
      [topics]="modalTopics"
      (visibleChange)="handleVisibleChange($event)"
    ></app-modal>`,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  tipo$!: Observable<Tipo[]>;
  tipoList = signal<null | Tipo[]>(null);
  tipo = signal<null | Tipo>(null);
  #service = inject(ServiceService);
  data = signal<Tipo[]>([]);
  display: boolean = false;
  selectedItem= signal<Detalhe | null>(null);

  columns = [
    { field: 'revisao', header: 'Revisão' },
    { field: 'revisao_anterior', header: 'Revisão anterior' },
    { field: 'nome', header: 'Nome' },
    { field: 'idEndereco', header: 'ID Endereço' },
    { field: 'banco_associado', header: 'Banco Associado' },
    {
      field: 'dataAlteracao',
      header: 'Data de Alteração',
      type: 'date',
      format: 'dd-MM-yyyy',
    },
  ];
  modalTopics: any[] = [
    {
      label: 'Old Revision',
      columns: [
        { field: 'revisao', header: 'Revisão' },
        { field: 'revisao_anterior', header: 'Revisão Anterior' },
        { field: 'nome', header: 'Nome' },
        { field: 'idEndereco', header: 'ID Endereço' },
        { field: 'banco_associado', header: 'Banco Associado' },
        { field: 'dataAlteracao', header: 'Data de Alteração', type: 'date', format: 'dd-MM-yyyy' }
      ],
      revision: 'old_rev'
    },
    {
      label: 'New Revision',
      columns: [
        { field: 'revisao', header: 'Revisão' },
        { field: 'revisao_anterior', header: 'Revisão Anterior' },
        { field: 'nome', header: 'Nome' },
        { field: 'idEndereco', header: 'ID Endereço' },
        { field: 'banco_associado', header: 'Banco Associado' },
        { field: 'dataAlteracao', header: 'Data de Alteração', type: 'date', format: 'dd-MM-yyyy' }
      ],
      revision: 'new_rev'
    }
  ];
  
  modalData = signal<Detalhe | null>(null);
  
  ngOnInit(): void {
    this.getAllRegistros();
  }
  private getComparacao(oldRev:string,newRev:string) {
    this.#service.getTwoRev(oldRev,newRev).subscribe({
      next: (next) => {
        
        this.modalData.set(next);
        console.log(this.modalData());
      },
      error: (err) => console.log(err),
    });
  }

  private getAllRegistros() {
    this.#service.getAll().subscribe({
      next: (next) => {
        this.data.set(next);
      },
      error: (err) => console.log(err),
    });
  }

 showModal(item: Tipo) {
   this.getComparacao(item.revisao,item.revisao_anterior);
    
    this.display = true;
  }
  hideModal() {
    this.display = false;
  }

  handleVisibleChange(visible: boolean) {
    this.display = visible;
  }

  restructureData(comparisonData: any): any {
    const restructuredData: any = {};
    
    for (const key in comparisonData.old_rev) {
      restructuredData[`old_rev_${key}`] = comparisonData.old_rev[key];
    }
    
    for (const key in comparisonData.new_rev) {
      restructuredData[`new_rev_${key}`] = comparisonData.new_rev[key];
    }
  
    return restructuredData;
  }
  
}
