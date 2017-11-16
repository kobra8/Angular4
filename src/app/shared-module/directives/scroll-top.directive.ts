import { Directive, Renderer2, ElementRef, Inject, HostBinding, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[csScrollTop]'
})
export class ScrollTopDirective {
private scrollTreshold = 150;
private scrollPosition = 0;

@HostBinding('class') scrollTopBtn = 'scroll-top-btn';

@HostListener('click') onClick() {
  let i = this.scrollPosition;
  let int = setInterval( () => {
    window.scrollTo(0,i);
    i -= 10;
    if(i == 0) {
      clearInterval(int)
    }
  }, 20);
}
@HostListener('document:scroll') onScroll() {
  this.scrollPosition = window.scrollY || this.document.documentElement.scrollTop || this.document.body.scrollTop; // Trzy warunki kompatybliności z przeglądarkami
  if(this.scrollPosition > this.scrollTreshold) {
    this.renderer.setStyle(this.hostElement.nativeElement, 'display', 'block');
  } else {
    this.renderer.setStyle(this.hostElement.nativeElement, 'display', 'none');
    
  }
 }

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private hostElement: ElementRef
  ) {

   }

}
