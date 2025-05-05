import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { ReactiveFormsModule }from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { AppRoutingModule }   from './app-routing.module';
import { NgChartsModule }     from 'ng2-charts';

import { AppComponent }       from './app.component';
import { SidebarComponent }   from './components/sidebar/sidebar.component';
import { HeaderComponent }    from './components/header/header.component';
import { HomeComponent }      from './pages/home/home.component';
import { InsightsComponent }  from './pages/insights/insights.component';
import { LoginComponent }     from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    InsightsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgChartsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
