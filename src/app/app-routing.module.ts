import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';

import { ExercisesComponent } from './exercises/exercises.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ExExprToKmapComponent } from './exercises/ex-expr-to-kmap/ex-expr-to-kmap.component';
import {ExIntroductionComponent} from './exercises/ex-introduction/ex-introduction.component';
import {ExFindBestGroupsComponent} from './exercises/ex-find-best-groups/ex-find-best-groups.component';
import {ExNameGroupComponent} from './exercises/ex-name-group/ex-name-group.component';

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
      { path: 'find-groups',
        children: [
          { path: ':id', component: ExFindBestGroupsComponent, }
        ]
      },
      { path: 'name-group',
        children: [
          { path: ':id', component: ExNameGroupComponent, }
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
