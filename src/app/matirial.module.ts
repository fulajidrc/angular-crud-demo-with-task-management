import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    
  ],
  imports: [
    // MatSlideToggleModule,
    // MatToolbarModule,
    // MatIconModule,
    // MatButtonModule,
    // MatCardModule,
    // MatInputModule,
    // MatSnackBarModule,
    // MatSidenavModule,
    // MatSelectModule
  ],
  exports:[
    MatSlideToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    DragDropModule,
    MatDividerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: []
})
export class MatirialModule { }
