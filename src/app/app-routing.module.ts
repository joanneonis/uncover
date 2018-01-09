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
import { ArtworkService } from './services/artwork.service';
import { QuestionService } from './services/question.service';
import { AnswerService } from './services/answer.service';
import { PhotoEyeComponent } from './rounds/photo-eye/photo-eye.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'welkom',
    component: LoginWelcomeComponent
  },
  {
    path: 'intro',
    component: IntroComponent,
  },
  {
    path: 'intro/:artworkId',
    component: IntroComponent,
    pathMatch: 'full',
    resolve: {
      artwork: ArtworkService
    }
  },
  {
    path: 'intro/:artworkId/answer',
    component: AnswerComponent,
    resolve: {
      artwork: ArtworkService,
      questions: QuestionService
    }
  },
  {
    path: 'intro/:artworkId/answer/:questionId',
    component: AnswersOthersComponent,
    resolve: {
      artwork: ArtworkService,
      question: QuestionService,
      answers: AnswerService
    }
  },
  {
    path: 'intro/:artworkId/answer/:questionId/literature',
    component: LiteratureComponent,
    resolve: {
      artwork: ArtworkService,
      question: QuestionService
    }
  },
  {
    path: 'remix',
    component: RemixComponent
  },
  {
    path: 'battles-completed',
    component: BattlesCompletedComponent
  },
  {
    path: 'share-result',
    component: ShareResultComponent
  },
  {
    path: 'discover',
    component: DiscoverComponent
  },
  {
    path: 'photo-eye',
    component: PhotoEyeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
