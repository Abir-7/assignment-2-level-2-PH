import { z } from 'zod';

const ZodOrdersSchema = z.object({
  email: z.string(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export default ZodOrdersSchema;
