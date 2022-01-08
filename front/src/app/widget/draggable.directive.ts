import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export interface DraggablePosition {
  x: number;
  y: number;
}

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective implements OnInit {
  parentRect!: DOMRect;
  @Input() position: DraggablePosition = { x: 0, y: 0 };
  @Output() positionChange = new EventEmitter<DraggablePosition>();
  rect!: DOMRect;
  startX = 0;
  startY = 0;
  x = 0;
  y = 0;

  constructor(private elt: ElementRef<HTMLElement>) {}

  initFromPosition() {
    this.x = (this.parentRect.width - this.rect.width) * this.position.x;
    this.y = (this.parentRect.height - this.rect.height) * this.position.y;
  }

  initRect() {
    const parentRect =
      this.elt.nativeElement.parentElement?.getBoundingClientRect();
    if (!parentRect) {
      throw new Error('parentRect must exist');
    }
    this.parentRect = parentRect;
    this.rect = this.elt.nativeElement.getBoundingClientRect();
  }

  ngOnInit(): void {
    this.elt.nativeElement.style.position = 'relative';
    this.elt.nativeElement.style.cursor = 'pointer';

    this.initRect();

    this.initFromPosition();
    this.paint();

    this.elt.nativeElement.addEventListener('mousedown', (event) => {
      // Prevent default dragging of selected content
      event.preventDefault();
      this.startX = event.pageX - this.x;
      this.startY = event.pageY - this.y;
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);
    });

    const mousemove = (event: MouseEvent) => {
      this.x = event.pageX - this.startX;
      this.y = event.pageY - this.startY;

      this.stayInsideParent();

      this.paint();

      this.sendPosition();
    };

    const mouseup = () => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    };
  }

  paint() {
    this.elt.nativeElement.style.left = this.x + 'px';
    this.elt.nativeElement.style.top = this.y + 'px';
  }

  sendPosition() {
    const position = {
      x:
        this.parentRect.width <= this.rect.width
          ? 0
          : this.x / (this.parentRect.width - this.rect.width),
      y:
        this.parentRect.height <= this.rect.height
          ? 0
          : this.y / (this.parentRect.height - this.rect.height),
    };

    this.positionChange.emit(position);
  }

  stayInsideParent() {
    this.x =
      Math.max(this.rect.left + this.x, this.parentRect.left) - this.rect.left;
    this.x =
      Math.min(this.rect.right + this.x, this.parentRect.right) -
      this.rect.right;

    this.y =
      Math.max(this.rect.top + this.y, this.parentRect.top) - this.rect.top;
    this.y =
      Math.min(this.rect.bottom + this.y, this.parentRect.bottom) -
      this.rect.bottom;
  }
}
