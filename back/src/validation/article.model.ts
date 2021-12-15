import {integer, number, object, optional, string} from 'superstruct';

export const ArticleModel = object({
  id: optional(string()),
  name: string(),
  price: number(),
  qty: integer(),
  image: optional(string()),
});
