// src/app/services/playlist.service.ts
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { AuthService } from './auth.service';

export interface PlaylistCount {
  name: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private readonly key = 'playlistClicks';
  private counts: Record<string, number> = {};
  private clickSubject = new Subject<void>();
  public clickRecorded$ = this.clickSubject.asObservable();

  constructor(private auth: AuthService) {
    if (!this.auth.isLoggedIn) {
      localStorage.removeItem(this.key);  // não logado zera tudo
      this.counts = {};
    } else {
      // logado → carrega do localStorage (mais tarde vira chamada ao backend)
      const saved = localStorage.getItem(this.key);
      this.counts = saved ? JSON.parse(saved) : {};
    }

    // Sempre que fizer logout, zera de novo
    this.auth.user$.subscribe(user => {
      if (!user) {
        localStorage.removeItem(this.key);
        this.counts = {};
        this.clickSubject.next();
      }
    });
  }

  /*
   Registra um clique na playlist.
   Se não estiver logado, acumula localmente.
   Quando estiver logado, aqui será substituído pela chamada HTTP.
   */
  recordClick(name: string): void {
    if (!this.auth.isLoggedIn) {
      this.counts[name] = (this.counts[name] || 0) + 1;
      localStorage.setItem(this.key, JSON.stringify(this.counts));
      this.clickSubject.next();
    } else {
      // FUTURO: chamar POST /api/playlists/click
      console.log(`(stub) enviaria click de "${name}" ao backend`);
    }
  }

  /** Retorna top N playlists com contagem, ordenadas desc. */
  getTopWithCounts(n: number): PlaylistCount[] {
    return Object.entries(this.counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, n);
  }

  /** Retorna todas as playlists com contagem, ordenadas alfabeticamente. */
  getAllWithCounts(): PlaylistCount[] {
    return Object.entries(this.counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
}
