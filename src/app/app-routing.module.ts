import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerComponent } from './rounds/answer/answer.component';
import { AnswersOthersComponent } from './rounds/answers-others/answers-others.component';
import { IntroComponent } from './rounds/intro/intro.component';
import { LoginComponent } from './login/login.component';
import { LoginWelcomeComponent } from './login-welcome/login-welcome.component';
import { DiscoverComponent } from './discover/discover.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'intro',
    component: IntroComponent,
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
  },
  {
    path: 'welkom',
    component: LoginWelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
