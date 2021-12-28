import { Injectable } from '@angular/core';
import { AngularToolsConfigService } from '@jlguenego/angular-tools';

@Injectable({
  providedIn: 'root',
})
export class CustomAngularToolsConfigService extends AngularToolsConfigService {
  override timeoutMsg = `Le serveur n'a pas répondu dans le délai imparti de ${this.timeoutDelay}ms.`;
}
