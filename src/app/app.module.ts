import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    ShareResultComponent
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
