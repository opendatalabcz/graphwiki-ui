import {ElementRef, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AnchorNavigation} from '@layout/entities/anchor-navigation';

@Injectable()
export class AnchorService {

    private anchorNavigations: AnchorNavigation[] = [];
    private anchorNavigationsSubject = new Subject<AnchorNavigation[]>();
    private activeNavigationLocked = false;

    getAnchorNavigations(): Observable<AnchorNavigation[]> {
        return this.anchorNavigationsSubject.asObservable();
    }

    register(element: ElementRef, label: string) {
        this.anchorNavigations.push({element, label, active: false, visible: false});
        this.anchorNavigations = this.anchorNavigations.sort(
            (a, b) => a.element.nativeElement.offsetTop > b.element.nativeElement.offsetTop ? 1 : -1);
        this.anchorNavigationsSubject.next(this.anchorNavigations);
    }

    unregister(element: ElementRef) {
        const index = this.anchorNavigations.findIndex(navigation => navigation.element === element);
        this.anchorNavigations.splice(index, 1);
        this.anchorNavigationsSubject.next(this.anchorNavigations);
    }

    elementActiveChange(label: string, element: ElementRef, visible: boolean) {
        const index = this.anchorNavigations.findIndex(navigation => navigation.element === element);
        if (visible) {
            this.anchorNavigations[index].visible = true;
            this.recalculateActiveAnchor(this.anchorNavigations[index]);
        } else {
            const wasActive = this.anchorNavigations[index].active;
            this.anchorNavigations[index].active = false;
            this.anchorNavigations[index].visible = false;
            if (wasActive) {
                this.setSuccessorAnchorAsActive();
            }
        }
        this.anchorNavigationsSubject.next(this.anchorNavigations);
    }

    recalculateActiveAnchor(currentNavigation: AnchorNavigation) {
        if (!this.activeNavigationLocked) {
            for (const navigation of this.anchorNavigations) {
                if (navigation.active) {
                    // previous navigation is active
                    return;
                }
                if (navigation === currentNavigation) {
                    this.anchorNavigations.forEach(value => value.active = false);
                    navigation.active = true;
                    return;
                }
            }
        }
    }

    setSuccessorAnchorAsActive() {
        for (const navigation of this.anchorNavigations) {
            if (navigation.visible) {
                navigation.active = true;
                break;
            }
        }
    }

    onScroll(targetAnchorNavigation: AnchorNavigation) {
        this.activeNavigationLocked = true;
        this.anchorNavigations.forEach(navigation => navigation.active = navigation === targetAnchorNavigation);
        this.anchorNavigationsSubject.next(this.anchorNavigations);
        setTimeout(() => this.activeNavigationLocked = false, 250);
    }
}
