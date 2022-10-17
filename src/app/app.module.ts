import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { MovieComponent } from './components/movie/movie.component';
import { FilterMoviesPipe } from './pipes/filter-movies.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavouriteComponent,
    NotFoundComponent,
    ModalComponent,
    CreateMovieComponent,
    MovieComponent,
    FilterMoviesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
