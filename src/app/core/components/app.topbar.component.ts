import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { MegaMenuItem } from 'primeng/api';
import { AppMainComponent } from 'src/app/core/layouts/main/app.main.component';
import { AppComponent } from 'src/app/app.component';
import { MegaMenuService } from '../services/app.megamenu.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [MegaMenuService],
    animations: [
        trigger('topbarActionPanelAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                animate('.12s cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 1, transform: '*' })),
            ]),
            transition(':leave', [
                animate('.1s linear', style({ opacity: 0 }))
            ])
        ])
    ]
})
export class AppTopBarComponent implements OnInit {
    activeItem: number;

    model: MegaMenuItem[] = [];

    @ViewChild('searchInput') searchInputViewChild: ElementRef;

    constructor(public appMain: AppMainComponent,
        public app: AppComponent,
        private menuService: MegaMenuService,) {
    }

    ngOnInit() {
        this.menuService.getMegaMenu().then(data => this.model = data);
    }

    onSearchAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.searchInputViewChild.nativeElement.focus();
                break;
        }
    }
}
