import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExercisesComponent } from './quiz/exercises.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { QuizExprToKmapComponent } from './quiz/expr-to-kmap/quiz-expr-to-kmap.component';
import {QuizIntroductionComponent} from './quiz/introduction/quiz-introduction.component';
import {QuizFindBestGroupsComponent} from './quiz/find-best-groups/quiz-find-best-groups.component';
import {QuizNameGroupComponent} from './quiz/name-group/quiz-name-group.component';
import {QuizLabelSquaresComponent} from './quiz/label-squares/quiz-label-squares.component';
import {QuizKmapToExprComponent} from './quiz/kmap-to-expr/quiz-kmap-to-expr.component';
import {PracticeComponent} from './practice/practice.component';
import {PracticeIntroductionComponent} from './practice/introduction/practice-introduction.component';
import {PracticeExprToKmapComponent} from './practice/expr-to-kmap/practice-expr-to-kmap.component';
import {PracticeFindBestGroupsComponent} from './practice/find-best-groups/practice-find-best-groups.component';
import {PracticeNameGroupComponent} from './practice/name-group/practice-name-group.component';
import {PracticeKmapToExprComponent} from './practice/kmap-to-expr/practice-kmap-to-expr.component';
import {InstantSolverComponent} from './instant-solver/instant-solver.component';
import {PracticeMinimizeExprComponent} from './practice/minimize-expr/practice-minimize-expr.component';
import {QuizMinimizeExprComponent} from './quiz/minimize-expr/quiz-minimize-expr.component';
import {PracticeLabelSquaresComponent} from './practice/practice-label-squares/practice-label-squares.component';
import {TutorialComponent} from './tutorial/tutorial.component';
import {ResolutionComponent} from './resolution/resolution.component';
import {FeedbackComponent} from './feedback/feedback.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'instant-solver', component: InstantSolverComponent },
  { path: 'practice',
    component: PracticeComponent,
    children: [
      { path: '', component: PracticeIntroductionComponent },
      { path: 'label-squares', component: PracticeLabelSquaresComponent },
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
      { path: 'kmap-to-expr',
        children: [
          { path: ':id', component: PracticeKmapToExprComponent }
        ]
      },
      { path: 'minimise-expr',
        children: [
          { path: ':id', component: PracticeMinimizeExprComponent }
        ]
      },
      { path: '**', component: PageNotFoundComponent }
    ]},
  { path: 'quiz',
    component: ExercisesComponent,
    children: [
      { path: '', component: QuizIntroductionComponent},
      { path: 'label-squares', component: QuizLabelSquaresComponent },
      { path: 'expr-to-kmap',
        children: [
          { path: ':id', component: QuizExprToKmapComponent }
        ]
      },
      { path: 'find-groups',
        children: [
          { path: ':id', component: QuizFindBestGroupsComponent }
        ]
      },
      { path: 'name-group',
        children: [
          { path: ':id', component: QuizNameGroupComponent }
        ]
      },
      { path: 'kmap-to-expr',
        children: [
          { path: ':id', component: QuizKmapToExprComponent }
        ]
      },
      { path: 'minimise-expr',
        children: [
          { path: ':id', component: QuizMinimizeExprComponent }
        ]
      },
      {path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'resolution', component: ResolutionComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
