import {Component, OnInit} from '@angular/core';
import {AnchorService} from '@layout/services/anchor.service';
import {AnchorNavigation} from '@layout/entities/anchor-navigation';

@Component({
    selector: 'app-navigation-panel',
    templateUrl: 'navigation-panel.component.html',
    styleUrls: ['navigation-panel.component.scss']
})
export class NavigationPanelComponent implements OnInit {

    anchorNavigations: AnchorNavigation[];

    constructor(private anchorService: AnchorService) {
    }

    ngOnInit() {
        this.anchorService.getAnchorNavigations()
            .subscribe(anchorNavigations => this.anchorNavigations = anchorNavigations);
    }

    scrollTo(anchorNavigation: AnchorNavigation) {
        window.scroll(0, anchorNavigation.element.nativeElement.offsetTop);
        this.anchorService.onScroll(anchorNavigation);
    }
}
