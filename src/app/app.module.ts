import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { KmapComponent } from './kmap/kmap.component';
import { FormComponent } from './form/form.component';
import { ParserService } from './parser.service';
import { MathjaxDirective } from './mathjax-aux/mathjax.directive';


@NgModule({
  declarations: [
    AppComponent,
    KmapComponent,
    FormComponent,
    MathjaxDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
