import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CategoryService } from './services/category.service';
import { AppRoutingModule } from './app-routing.module';
import { IntroComponent } from './rounds/intro/intro.component';
import { AnswerComponent } from './rounds/answer/answer.component';
import { AnswersOthersComponent } from './rounds/answers-others/answers-others.component';
import { ArtworkService } from './services/artwork.service';
import { LoginComponent } from './login/login.component';
import { LoginWelcomeComponent } from './login-welcome/login-welcome.component';
import { DiscoverComponent } from './discover/discover.component';
import { RemixComponent } from './rounds/remix/remix.component';
import { LiteratureComponent } from './rounds/literature/literature.component';
import { BattlesCompletedComponent } from './rounds/battles-completed/battles-completed.component';
import { ShareResultComponent } from './rounds/share-result/share-result.component';
import 'hammerjs';
import { QuestionService } from './services/question.service';
import { AnswerService } from './services/answer.service';
import { DrawingComponent } from './rounds/answer/drawing/drawing.component';
import { SoundComponent } from './rounds/answer/sound/sound.component';
import { SoundWavesComponent } from './rounds/answer/sound-waves/sound-waves.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    AnswerComponent,
    AnswersOthersComponent,
    LoginComponent,
    LoginWelcomeComponent,
    DiscoverComponent,
    RemixComponent,
    LiteratureComponent,
    BattlesCompletedComponent,
    ShareResultComponent,
    DrawingComponent,
    SoundComponent,
    SoundWavesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'uncover'),
    AngularFirestoreModule,
    AppRoutingModule,
  ],
  providers: [CategoryService, ArtworkService, QuestionService, AnswerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
