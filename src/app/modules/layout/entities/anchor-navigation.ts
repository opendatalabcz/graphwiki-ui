import {ElementRef} from '@angular/core';

export interface AnchorNavigation {
    element: ElementRef;
    label: string;
    active: boolean;
    visible: boolean;
}
