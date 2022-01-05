import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { faImage, faImages } from '@fortawesome/free-solid-svg-icons';
import { CacheService } from '@jlguenego/angular-tools';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnChanges, AfterViewInit {
  faImage = faImage;
  faImages = faImages;
  layout = 'p-others';
  @Input() srcset: string[] = [];

  constructor(
    private cacheService: CacheService,
    private elt: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit(): void {
    const host = this.elt.nativeElement;
    function outputsize() {
      const width = host.offsetWidth;
      const height = host.offsetHeight;
      width < 100
        ? host.classList.add('small')
        : host.classList.remove('small');
    }

    new ResizeObserver(outputsize).observe(host);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes', this.srcset);
    if (this.srcset.length <= 5) {
      this.layout = 'p-' + this.srcset.length;
    }
  }

  onImgError(event: Event, url: string) {
    const img = event.target as HTMLImageElement;
    if (!url) {
      return;
    }
    this.cacheService.loadImage(img, url);
  }
}
