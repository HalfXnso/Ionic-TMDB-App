import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent, IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { ApiResult, MovieResult } from '../interfaces/interface';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList,IonItem, IonAvatar,IonSkeletonText, IonAlert, IonLabel,  DatePipe, RouterModule, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent],
})
export class HomePage {
  imageUrl: string = 'https://image.tmdb.org/t/p';
  private currentPage = 1;
  private movieService = inject(MovieService);
  public error = null;
  movies: MovieResult[] = [];
  public isLoading = false;
  public dummyArray = new Array(20);
  constructor() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;
    if (!event) {
      this.isLoading = true;
    }
    this.movieService.getTopRatedMovies(this.currentPage).pipe(finalize(() => {
      this.isLoading = false;
      if (event) {
        event.target.complete();

      }
    }),
      catchError((err: any) => {
        console.error(err);

        this.error = err.error.status_message;
        return [];

      })
    ).subscribe({
      next: (result) => {
        console.log(result);
        this.movies.push(...result.results);
        if(event){
        event.target.disabled = result.total_pages === this.currentPage;
        }
  }
})
  }


loadMore(event: InfiniteScrollCustomEvent) {
  this.currentPage++;
  this.loadMovies(event);
}

roundNumber(value:number): number{
  return Math.round(value *2)/2;
}
}
