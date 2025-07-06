import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../interfaces/interface';
import {cashOutline, calendarOutline, starOutline, add} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert, IonLabel, DatePipe, RouterModule, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonText, IonIcon, CommonModule],
})
export class DetailsPage {
  private movieService = inject(MovieService);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public movie: WritableSignal<MovieResult | null> = signal(null);

  @Input()
  set id(movieId: string){
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      this.movie.set(movie);
      console.log(movie);
    });
  }
  constructor() {
    addIcons({
      cashOutline,
      calendarOutline,
    });
  }


}
