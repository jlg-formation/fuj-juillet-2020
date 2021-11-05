export interface AuthorizationConfig {
  forbiddenPath?: PathSpecifier[];
  onlyAllowedPath?: PathSpecifier[];
}

export interface PathSpecifierObject {
  type: 'regexp' | 'string';
  path: string;
}

export type PathSpecifier = PathSpecifierObject | string;
