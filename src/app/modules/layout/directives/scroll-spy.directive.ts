import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {AnchorService} from '@layout/services/anchor.service';

@Directive({
    selector: '[appScrollSpy]'
})
export class ScrollSpyDirective implements OnInit, OnDestroy {

    @Input('navigationLabel') navigationLabel: string;

    private intersectionObserver: IntersectionObserver;

    constructor(private element: ElementRef, private anchorService: AnchorService) {
    }

    ngOnInit() {
        this.anchorService.register(this.element, this.navigationLabel);

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        };

        this.intersectionObserver = new IntersectionObserver(this.intersectionCallback(), options);
        (this.intersectionObserver as any).POLL_INTERVAL = 100;
        this.intersectionObserver.observe(this.element.nativeElement);
    }

    ngOnDestroy(): void {
        this.intersectionObserver.disconnect();
        this.anchorService.unregister(this.element);
    }

    private intersectionCallback(): IntersectionObserverCallback {
        return (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                this.anchorService.elementActiveChange(this.navigationLabel, this.element, entry.isIntersecting);
            });
        };
    }
}
