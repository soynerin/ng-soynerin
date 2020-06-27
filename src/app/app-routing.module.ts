import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';
import { AboutComponent } from './pages/about/about.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ContactComponent } from './pages/contact/contact.component';


const routes: Routes = [
  { path: 'hero', component: HeroComponent, data: {animation: 'Hero'} },
  { path: 'about', component: AboutComponent, data: {animation: 'About'} },
  { path: 'resume', component: ResumeComponent, data: {animation: 'Resume'} },
  { path: 'works', component: PortfolioComponent, data: {animation: 'Portfolio'} },
  { path: 'contact', component: ContactComponent, data: {animation: 'Contact'} },
  { path: '**', pathMatch: 'full', redirectTo: 'hero' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
