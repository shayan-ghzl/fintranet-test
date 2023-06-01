import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appDropdownCtrl]',
  exportAs: 'exportDropdownCtrl',
})
export class DropdownCtrlDirective {
  
  @Input('appDropdownCtrl') dropdown!: DropdownDirective;
  buttonCtrl!: HTMLElement;

  constructor(private elementRef: ElementRef) {
    this.buttonCtrl = elementRef.nativeElement;
   }

  @HostListener("click")
  toggle() { this.dropdown.toggle(); }
}

@Directive({
  selector: '[appDropdown]',
  exportAs: 'exportDropdown',
  host: {
    '[class.show]': 'isShow',
  },
})
export class DropdownDirective implements OnInit {
  @Output() dropdownShow = new EventEmitter();
  @Input('appDropdown') ctrl!: DropdownCtrlDirective;
  private target!: HTMLElement;

  private _isShow = false;

  private set isShow(value: boolean){
    this._isShow = value;
    if (value) {
      this.dropdownShow.emit();
    }
  }

  private get isShow(){
    return this._isShow;
  }

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.target = this.elementRef.nativeElement;
  }

  open() {
    this.isShow = true;
  }

  close() {
    this.isShow = false;
  }

  toggle() {
    this.isShow = !this.isShow;
  }

  get isOpen() {
    return this.isShow;
  }

  @HostListener('document:click', ['$event', '$event.target'])
  detectClickOutside(event: MouseEvent, target: HTMLElement) {
    if (!this.target.contains(target) && !this.ctrl.buttonCtrl.contains(target)) {
      this.close();
    }
  }
}