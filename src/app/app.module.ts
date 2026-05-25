import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CountUpModule } from 'ngx-countup'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { HeaderComponent } from './shared/header/header.component'
import { SocialBoxComponent } from './shared/social-box/social-box.component'
import { OverlayMenuComponent } from './shared/overlay-menu/overlay-menu.component'
import { HeroComponent } from './pages/hero/hero.component'
import { AboutComponent } from './pages/about/about.component'
import { ResumeComponent } from './pages/resume/resume.component'
import { ServicesComponent } from './pages/services/services.component'
import { PortfolioComponent } from './pages/portfolio/portfolio.component'
import { TestimonialComponent } from './pages/testimonial/testimonial.component'
import { BlogComponent } from './pages/blog/blog.component'
import { ContactComponent } from './pages/contact/contact.component'
import { LoadingComponent } from './shared/loading/loading.component'
import { PortfolioOverlayComponent } from './shared/portfolio-overlay/portfolio-overlay.component'
import { BlogOverlayComponent } from './shared/blog-overlay/blog-overlay.component'
import { AdminComponent } from './pages/admin/admin.component'

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        HeaderComponent,
        SocialBoxComponent,
        OverlayMenuComponent,
        HeroComponent,
        AboutComponent,
        ResumeComponent,
        ServicesComponent,
        PortfolioComponent,
        TestimonialComponent,
        BlogComponent,
        ContactComponent,
        LoadingComponent,
        PortfolioOverlayComponent,
        BlogOverlayComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        CountUpModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
