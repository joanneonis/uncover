import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameRoundComponent } from './game-round/game-round.component';
import { AnswerComponent } from './game-round/rounds/answer/answer.component';
import { AnswersOthersComponent } from './game-round/rounds/answers-others/answers-others.component';
import { IntroComponent } from './game-round/rounds/intro/intro.component';


const routes: Routes = [
  {
    path: '',
    component: GameRoundComponent
  },
  {
    path: 'intro',
    component: IntroComponent
  },
  {
    path: 'intro/:artworkId',
    component: IntroComponent
  },
  {
    path: 'answer',
    component: AnswerComponent
  },
  {
    path: 'answers-others',
    component: AnswersOthersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
