import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerComponent } from './rounds/answer/answer.component';
import { AnswersOthersComponent } from './rounds/answers-others/answers-others.component';
import { IntroComponent } from './rounds/intro/intro.component';
import { LoginComponent } from './login/login.component';
import { LoginWelcomeComponent } from './login-welcome/login-welcome.component';
import { DiscoverComponent } from './discover/discover.component';
import { BattlesCompletedComponent } from './rounds/battles-completed/battles-completed.component';
import { LiteratureComponent } from './rounds/literature/literature.component';
import { RemixComponent } from './rounds/remix/remix.component';
import { ShareResultComponent } from './rounds/share-result/share-result.component';


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
  },
  {
    path: 'battles-completed',
    component: BattlesCompletedComponent
  },
  {
    path: 'literature',
    component: LiteratureComponent
  },
  {
    path: 'remix',
    component: RemixComponent
  },
  {
    path: 'share-result',
    component: ShareResultComponent
  },
  {
    path: 'discover',
    component: DiscoverComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
