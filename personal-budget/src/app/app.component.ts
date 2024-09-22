import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleComponent } from './article/article.component';
import { HeroComponent } from './hero/hero.component';

@Component({
  selector: 'pb-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, FooterComponent, HomepageComponent, ArticleComponent, HeroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'personal-budget';
}
