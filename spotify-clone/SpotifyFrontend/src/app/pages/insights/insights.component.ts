import { Component, OnInit } from '@angular/core';
import { PlaylistService }   from '../../services/playlist.service';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  public topPlaylist: { name: string; count: number } | null = null;

  // Grafico top 3 playlist
  public pieData!: ChartData<'pie', number[], string>;
  public pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Top 3 Playlists' }
    }
  };

  // Todas as playlists clicadas
  public barData!: ChartData<'bar', number[], string>;
  public barOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Cliques por Playlist' }
    },
    scales: {
      x: { title: { display: true, text: 'Playlist' } },
      y: { title: { display: true, text: 'Cliques' }, beginAtZero: true }
    }
  };

  constructor(private ps: PlaylistService) {}

  ngOnInit(): void {
    this.loadTop1();
    this.loadTop3Pie();
    this.loadAllBar();
  }

  private loadTop1() {
    const top = this.ps.getTopWithCounts(1);
    this.topPlaylist = top.length ? top[0] : null;
  }

  private loadTop3Pie() {
    const top3 = this.ps.getTopWithCounts(3);
    this.pieData = {
      labels: top3.map(p => p.name),
      datasets: [{ data: top3.map(p => p.count), backgroundColor: ['#1DB954','#1ED760','#1AA34A'] }]
    };
  }

  private loadAllBar() {
    const all = this.ps.getTopWithCounts(Infinity)
      .sort((a,b)=> a.name.localeCompare(b.name));
    this.barData = {
      labels: all.map(p => p.name),
      datasets: [{ data: all.map(p => p.count), backgroundColor: '#1DB954' }]
    };
  }
}
