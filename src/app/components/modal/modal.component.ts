import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Formater } from '../../services/formater.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DialogModule,ButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{
  ngOnInit(): void {
    console.log("estou no modal ",this.data);
    
  }
  @Input() visible: boolean = false;
  @Input() header: string = 'Detalhes';
  @Input() data: any;
  @Input() columns: { field: string, header: string }[] = [];
  @Input() topics: any[] = [];

  @Output() visibleChange = new EventEmitter<boolean>();
  formater : Formater = new Formater(); 
  onHide() {
    this.visibleChange.emit(false);
  }

  
}
