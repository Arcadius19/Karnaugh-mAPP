import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';

import { ExercisesComponent } from './exercises/exercises.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ExExprToKmapComponent } from './exercises/ex-expr-to-kmap/ex-expr-to-kmap.component';
import {ExIntroductionComponent} from './exercises/ex-introduction/ex-introduction.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'playground', component: PlaygroundComponent },
  { path: 'exercises',
    component: ExercisesComponent,
    children: [
      { path: '', component: ExIntroductionComponent},
      { path: 'expr-to-kmap',
        children: [
          { path: ':id', component: ExExprToKmapComponent, }
        ]
      },
      {path: '**', component: PageNotFoundComponent}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
