import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CategoryService } from './services/category.service';
import { GameRoundComponent } from './game-round/game-round.component';
import { AppRoutingModule } from './app-routing.module';
import { IntroComponent } from './game-round/rounds/intro/intro.component';
import { AnswerComponent } from './game-round/rounds/answer/answer.component';
import { AnswersOthersComponent } from './game-round/rounds/answers-others/answers-others.component';
import { ArtworkService } from './services/artwork.service';


@NgModule({
  declarations: [
    AppComponent,
    GameRoundComponent,
    IntroComponent,
    AnswerComponent,
    AnswersOthersComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'uncover'),
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [CategoryService, ArtworkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
