import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MenucardComponent } from './menucard/menucard.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './screens/login/login.component';
import { CreatepostComponent } from './screens/createpost/createpost.component';
import { MyfavouritesComponent } from './screens/myfavourites/myfavourites.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HomeComponent,
    MenucardComponent,
    FooterComponent,
    LoginComponent,
    CreatepostComponent,
    MyfavouritesComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rent-hub';
}
