import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Formater } from '../../services/formater.service';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [TableModule,AsyncPipe],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.scss'
})
export class TabelaComponent implements OnInit{
  ngOnInit(): void {
    console.log("estou na tabela",this.data);
    
  }
  @Input() data: any[] = [];
  @Input() columns: { field: string, header: string }[] = [];
  @Output() rowSelected = new EventEmitter<any>();
  formater: Formater = new Formater;
  showDetails(item: any) {
    this.rowSelected.emit(item);
  }

  
}
