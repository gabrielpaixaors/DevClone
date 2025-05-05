
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlaylistService, PlaylistCount } from '../../services/playlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private allTitles = [
    'Daily Mix para Você','Discover Weekly','Release Radar','Top Brasil',
    'Chill Hits','Your Top Songs 2025','Liked Songs','Foco no Trabalho',
    'Pagode Raiz','Rock Antigos','Sertanejo Universitário','Funk Hits',
    'Eletrônica Essencial','Música Clássica'
  ];

  public sidebarPlaylists: { name: string; img: string }[] = [];
  private sub!: Subscription;

  constructor(private ps: PlaylistService) {}

  ngOnInit(): void {
    this.updateSidebar();

    // atualiza quando um clique é registrado
    this.sub = this.ps.clickRecorded$.subscribe(() => this.updateSidebar());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private updateSidebar(): void {
    const top3: PlaylistCount[] = this.ps.getTopWithCounts(3);
    // extrai apenas os nomes; se não houver 3, usa os 3 primeiros fixos
    const list = top3.length === 3
      ? top3.map(p => p.name)
      : this.allTitles.slice(0, 3);

    this.sidebarPlaylists = list.map(name => ({
      name,
      img: `https://picsum.photos/seed/${encodeURIComponent(name)}/24/24`
    }));
  }
}
