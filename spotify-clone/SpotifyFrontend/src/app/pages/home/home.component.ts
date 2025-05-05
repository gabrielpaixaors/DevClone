import { Component, OnInit } from '@angular/core';
import { PlaylistService }    from '../../services/playlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public heroCards = [
    {
      title: 'Your Top Songs 2025',
      img: `https://picsum.photos/seed/${encodeURIComponent('Your Top Songs 2025')}/150/150`
    },
    {
      title: 'Liked Songs',
      img: `https://picsum.photos/seed/${encodeURIComponent('Liked Songs')}/150/150`
    }
  ];

  private allCards = [
    'Daily Mix para Você','Discover Weekly','Release Radar','Top Brasil',
    'Chill Hits','Your Top Songs 2025','Liked Songs','Foco no Trabalho',
    'Pagode Raiz','Rock Antigos','Sertanejo Universitário','Funk Hits',
    'Eletrônica Essencial','Música Clássica'
  ];


  public popularArtists: { name: string; img: string }[] = [
    { name: 'The Silver Strings',    img: 'https://randomuser.me/api/portraits/men/10.jpg' },
    { name: 'Luna & Sol',            img: 'https://randomuser.me/api/portraits/women/21.jpg' },
    { name: 'Echo Heart',            img: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Bruno Silva',           img: 'https://randomuser.me/api/portraits/men/43.jpg' },
    { name: 'Neon Spectrum Trio',    img: 'https://randomuser.me/api/portraits/women/54.jpg' },
    { name: 'Viola & Vento',         img: 'https://randomuser.me/api/portraits/men/65.jpg' },
    { name: 'Solo Star',             img: 'https://randomuser.me/api/portraits/women/76.jpg' },
    { name: 'Midnight Voices',       img: 'https://randomuser.me/api/portraits/men/87.jpg' },
    { name: 'Carla Márquez',         img: 'https://randomuser.me/api/portraits/women/18.jpg' },
    { name: 'The Rolling Beats',     img: 'https://randomuser.me/api/portraits/men/29.jpg' },
    { name: 'Ana & João',            img: 'https://randomuser.me/api/portraits/women/30.jpg' },
    { name: 'Starlight Ensemble',    img: 'https://randomuser.me/api/portraits/men/41.jpg' },
    { name: 'Diego Costa',           img: 'https://randomuser.me/api/portraits/men/52.jpg' },
    { name: 'Aurora & the Wolves',   img: 'https://randomuser.me/api/portraits/women/63.jpg' },
    { name: 'Vozes do Rio',          img: 'https://randomuser.me/api/portraits/men/74.jpg' }
  ];
  public recommendations: { title: string; sub: string; img: string }[] = [];

  constructor(private ps: PlaylistService) {}

  ngOnInit(): void {
    this.loadRandomRecommendations();
  }

  private shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  private loadRandomRecommendations(): void {
    this.recommendations = this
      .shuffle(this.allCards)
      .slice(0, 14)
      .map(title => ({
        title,
        sub: 'Spotify',
        img: `https://picsum.photos/seed/${encodeURIComponent(title)}/200/200`
      }));
  }

  /* Chamado pelo botão play na Home */
  onPlay(title: string): void {
    this.ps.recordClick(title);
  }
}
