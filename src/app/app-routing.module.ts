import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerComponent } from './rounds/answer/answer.component';
import { AnswersOthersComponent } from './rounds/answers-others/answers-others.component';
import { IntroComponent } from './rounds/intro/intro.component';


const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
    pathMatch: 'full'
  },
  {
    path: 'intro/:artworkId',
    component: IntroComponent,
    pathMatch: 'full'
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
