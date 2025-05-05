import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }        from './pages/home/home.component';
import { InsightsComponent }    from './pages/insights/insights.component';
import { LoginComponent }       from './pages/login/login.component';  // ← importe aqui

const routes: Routes = [
  { path: '',        component: HomeComponent    },
  { path: 'insights',component: InsightsComponent},
  { path: 'login',   component: LoginComponent   },  // ← crie essa rota
  { path: '**',      redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
