import { Movie } from './../../interfaces/cartelera-response';
import { PeliculasService } from './../../services/peliculas.service';

import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = []
  public moviesSlideShow: Movie[] = []

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    
    const  pos = (document.documentElement.scrollTop || document.body.scrollTop ) + 1400;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight );

    if (pos > max ) {

      if (this.peliculasServices.cargando ) { return;}

      this.peliculasServices.getCartelera().subscribe(movies => {
        this.movies.push(...movies);
      })
    }

    
    
  }

  constructor(private peliculasServices: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasServices.getCartelera()
    .subscribe( movies  => {
      this.movies = movies;
      this.moviesSlideShow = movies;
      
    })
  }

  ngOnDestroy() {
    this.peliculasServices.resetCarteleraPage();
  }

}
