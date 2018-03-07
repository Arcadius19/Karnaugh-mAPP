import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MathjaxDirective } from './auxiliary/mathjax-aux/mathjax.directive';
import { AppRoutingModule } from './app-routing.module';
import { ExercisesComponent } from './quiz/exercises.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { QuizExprToKmapComponent } from './quiz/expr-to-kmap/quiz-expr-to-kmap.component';
import { QuizIntroductionComponent } from './quiz/introduction/quiz-introduction.component';
import { InteractiveKmapComponent } from './auxiliary/interactive-kmap/interactive-kmap.component';
import { QuizFindBestGroupsComponent } from './quiz/find-best-groups/quiz-find-best-groups.component';
import { QuizNameGroupComponent } from './quiz/name-group/quiz-name-group.component';
import { QuizLabelSquaresComponent } from './quiz/label-squares/quiz-label-squares.component';
import { QuizKmapToExprComponent } from './quiz/kmap-to-expr/quiz-kmap-to-expr.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { UserProgressComponent } from './quiz/user-progress/user-progress.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PracticeComponent } from './practice/practice.component';
import { PracticeIntroductionComponent } from './practice/introduction/practice-introduction.component';
import { ExprToKmapComponent } from './exercises/exercise-types/expr-to-kmap/expr-to-kmap.component';
import { PracticeExprToKmapComponent } from './practice/expr-to-kmap/practice-expr-to-kmap.component';
import {ExNameGroupService} from './exercises/exercise-types/name-group/ex-name-group.service';
import {ExerciseService} from './exercises/exercise.service';
import {ExExprToKmapService} from './exercises/exercise-types/expr-to-kmap/ex-expr-to-kmap.service';
import {ExKmapToExprService} from './exercises/exercise-types/kmap-to-expr/ex-kmap-to-expr.service';
import {ExFindBestGroupsService} from './exercises/exercise-types/find-best-groups/ex-find-best-groups.service';
import {ExLabelSquaresService} from './exercises/exercise-types/label-squares/ex-label-squares.service';
import { KmapToExprComponent } from './exercises/exercise-types/kmap-to-expr/kmap-to-expr.component';
import { FindBestGroupsComponent } from './exercises/exercise-types/find-best-groups/find-best-groups.component';
import { NameGroupComponent } from './exercises/exercise-types/name-group/name-group.component';
import { PracticeFindBestGroupsComponent } from './practice/find-best-groups/practice-find-best-groups.component';
import { PracticeNameGroupComponent } from './practice/name-group/practice-name-group.component';
import { PracticeKmapToExprComponent } from './practice/kmap-to-expr/practice-kmap-to-expr.component';
import { InstantSolverComponent } from './instant-solver/instant-solver.component';
import { MinimizeExprComponent } from './exercises/exercise-types/minimize-expr/minimize-expr.component';
import { PracticeMinimizeExprComponent } from './practice/minimize-expr/practice-minimize-expr.component';
import {MinimizeExprService} from './exercises/exercise-types/minimize-expr/minimize-expr.service';
import { QuizMinimizeExprComponent } from './quiz/minimize-expr/quiz-minimize-expr.component';
import { PracticeLabelSquaresComponent } from './practice/practice-label-squares/practice-label-squares.component';
import { LabelSquaresComponent } from './exercises/exercise-types/label-squares/label-squares.component';


@NgModule({
  entryComponents: [
    UserProgressComponent
  ],
  declarations: [
    AppComponent,
    MathjaxDirective,
    ExercisesComponent,
    PageNotFoundComponent,
    HomeComponent,
    QuizExprToKmapComponent,
    QuizIntroductionComponent,
    InteractiveKmapComponent,
    QuizFindBestGroupsComponent,
    QuizNameGroupComponent,
    QuizLabelSquaresComponent,
    QuizKmapToExprComponent,
    TutorialComponent,
    UserProgressComponent,
    PracticeComponent,
    PracticeIntroductionComponent,
    ExprToKmapComponent,
    PracticeExprToKmapComponent,
    KmapToExprComponent,
    FindBestGroupsComponent,
    NameGroupComponent,
    PracticeFindBestGroupsComponent,
    PracticeNameGroupComponent,
    PracticeKmapToExprComponent,
    InstantSolverComponent,
    MinimizeExprComponent,
    PracticeMinimizeExprComponent,
    QuizMinimizeExprComponent,
    PracticeLabelSquaresComponent,
    LabelSquaresComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [
    BsModalService,
    ExerciseService,
    ExLabelSquaresService,
    ExExprToKmapService,
    ExFindBestGroupsService,
    ExNameGroupService,
    ExKmapToExprService,
    MinimizeExprService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
