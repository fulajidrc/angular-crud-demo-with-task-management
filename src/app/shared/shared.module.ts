import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatirialModule } from '../matirial.module';



@NgModule({
  declarations: [
    ConfirmComponent
  ],
  imports: [
    MatirialModule,
    CommonModule,
    
  ],
  exports:[
    ConfirmComponent
  ]
})
export class SharedModule { }
