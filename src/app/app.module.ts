import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { KmapComponent } from './kmap/kmap.component';
import { FormComponent } from './form/form.component';
import { ParserService } from './parser.service';
import { MathjaxDirective } from './mathjax-aux/mathjax.directive';
import { TypeFormComponent } from './kmap/type-form/type-form.component';
import {GlobalVariablesService} from './global-variables.service';
import {AppRoutingModule} from './app-routing.module';
import { ExercisesComponent } from './exercises/exercises.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ExExprToKmapComponent } from './exercises/ex-expr-to-kmap/ex-expr-to-kmap.component';
import { ExIntroductionComponent } from './exercises/ex-introduction/ex-introduction.component';
import { InteractiveKmapComponent } from './interactive-kmap/interactive-kmap.component';
import { ExFindBestGroupsComponent } from './exercises/ex-find-best-groups/ex-find-best-groups.component';
import { ExNameGroupComponent } from './exercises/ex-name-group/ex-name-group.component';


@NgModule({
  declarations: [
    AppComponent,
    KmapComponent,
    FormComponent,
    MathjaxDirective,
    TypeFormComponent,
    ExercisesComponent,
    PageNotFoundComponent,
    HomeComponent,
    PlaygroundComponent,
    ExExprToKmapComponent,
    ExIntroductionComponent,
    InteractiveKmapComponent,
    ExFindBestGroupsComponent,
    ExNameGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    ParserService,
    GlobalVariablesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
