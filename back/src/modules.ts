import {User} from './interfaces/User';

declare module 'express-session' {
  interface SessionData {
    accessToken?: string;
    afterLoginRoute?: string;
    user?: User;
  }
}

declare module 'http' {
  interface IncomingMessage {
    user: User;
  }
}
