import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <app-sidebar></app-sidebar>
    <div class="main">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .main {
      margin-left: 240px;
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
  `]
})
export class AppComponent {}
