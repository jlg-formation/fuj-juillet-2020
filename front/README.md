# Wiame ERP Playground

## Authorization

### Requirement

The authorization guard is able to indicate if a user can access a given url in a sync way (for performance).

```ts
function isAuthorized(path: string, user: User): boolean;
```

To answer, `isAuthorized` uses the `AuthorizationConfig` object. To say yes, the path must not be in the blackList given by `AuthorizationConfig.forbiddenPath`. If `AuthorizationConfig.onlyAllowedPath` is given, then the path must be in it.

Both `forbiddenPath` and `onlyAllowedPath` can be `string` but also `Regexp`.

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
