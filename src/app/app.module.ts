import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EarthquakeComponent } from './earthquake/earthquake.component';


@NgModule({
  declarations: [
    AppComponent,
    EarthquakeComponent

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
