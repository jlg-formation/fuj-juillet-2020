import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = new BehaviorSubject<User | undefined>(undefined);

  constructor() {}
}
