import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faImage, faImages } from '@fortawesome/free-solid-svg-icons';
import { CacheService } from '@jlguenego/angular-tools';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnChanges {
  @Input() srcset: string[] = [];
  faImage = faImage;
  faImages = faImages;
  layout = 'p-others';

  constructor(private cacheService: CacheService) {}
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
