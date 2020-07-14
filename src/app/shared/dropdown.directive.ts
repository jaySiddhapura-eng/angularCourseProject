import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';


 @Directive({
     selector: '[appDropdown]'
     })
 export class DropdownDirective{

    private elementRef : ElementRef; // varaible which hold the reeference of the element

    @HostBinding('class.open') isOpen = false;

    // simple dropdown 
    // @HostListener('click') toggleOpen(){
    //     this.isOpen = !this.isOpen ;        // toggles the status of isOpen variable
    // }

    // close dropdown from anywhere on the page
    @HostListener('document:click', ['$event']) toggleOpen(event: Event){
        this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen:false;
    }

    constructor(private elRef:ElementRef){
        this.elementRef = elRef;
    }

 }


