import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'exportAppDropdown',
  host: {
    '[class.show]': 'isShow',
    // '[style.display]': "'inline-block'",
  },
})
export class DropdownDirective implements OnInit, OnDestroy {

  @Input() closeOnOutsideClick = true;
  @Output() dropdownShowed = new EventEmitter();
  @Output() dropdownClosed = new EventEmitter();

  documentClickListener: any;

  constructor(
    private elem: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    // add listener conditionally
    if (this.closeOnOutsideClick) {
      this.documentClickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
        if (!this.elem.nativeElement.contains(event.target)) {
          this.close();
        }
      });
    }
  }

  private _isShow = false;
  private set isShow(value: boolean){
    this._isShow = value;
    if (value) {
      this.dropdownShowed.emit();
    }else{
      this.dropdownClosed.emit();
    }
  }
  get isShow(){
    return this._isShow;
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

  // @HostListener('document:click', ['$event.target'])
  // detectClickOutside(target: HTMLElement) {
  //   if (!this.elem.nativeElement.contains(target)) {
  //     this.close();
  //   }
  // }

  ngOnDestroy(): void {
    // remove listener if exist
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }

}
