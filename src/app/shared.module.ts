import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule
]

@NgModule({
    imports : [...modules],
    exports : [...modules]

})
export class SharedModule { }
