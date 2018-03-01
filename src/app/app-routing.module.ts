import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExercisesComponent } from './quiz/exercises.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ExExprToKmapComponent } from './quiz/ex-expr-to-kmap/ex-expr-to-kmap.component';
import {ExIntroductionComponent} from './quiz/ex-introduction/ex-introduction.component';
import {ExFindBestGroupsComponent} from './quiz/ex-find-best-groups/ex-find-best-groups.component';
import {ExNameGroupComponent} from './quiz/ex-name-group/ex-name-group.component';
import {ExLabelSquaresComponent} from './quiz/ex-label-squares/ex-label-squares.component';
import {ExKmapToExprComponent} from './quiz/ex-kmap-to-expr/ex-kmap-to-expr.component';
import {TutorialComponent} from './tutorial/tutorial.component';
import {PracticeComponent} from './practice/practice.component';
import {PracticeIntroductionComponent} from './practice/practice-introduction/practice-introduction.component';
import {PracticeExprToKmapComponent} from './practice/practice-expr-to-kmap/practice-expr-to-kmap.component';
import {PracticeFindBestGroupsComponent} from './practice/practice-find-best-groups/practice-find-best-groups.component';
import {PracticeNameGroupComponent} from './practice/practice-name-group/practice-name-group.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'playground', component: PlaygroundComponent },
  { path: 'practice',
    component: PracticeComponent,
    children: [
      { path: '', component: PracticeIntroductionComponent },
      { path: 'expr-to-kmap',
        children: [
          { path: ':id', component: PracticeExprToKmapComponent }
        ]
      },
      { path: 'find-groups',
        children: [
          { path: ':id', component: PracticeFindBestGroupsComponent }
        ]
      },
      { path: 'name-group',
        children: [
          { path: ':id', component: PracticeNameGroupComponent }
        ]
      },
      { path: '**', component: PageNotFoundComponent }
    ]},
  { path: 'exercises',
    component: ExercisesComponent,
    children: [
      { path: '', component: ExIntroductionComponent},
      { path: 'label-squares', component: ExLabelSquaresComponent },
      { path: 'expr-to-kmap',
        children: [
          { path: ':id', component: ExExprToKmapComponent }
        ]
      },
      { path: 'find-groups',
        children: [
          { path: ':id', component: ExFindBestGroupsComponent }
        ]
      },
      { path: 'name-group',
        children: [
          { path: ':id', component: ExNameGroupComponent }
        ]
      },
      { path: 'kmap-to-expr',
        children: [
          { path: ':id', component: ExKmapToExprComponent }
        ]
      },
      {path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: 'tutorial', component: TutorialComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
