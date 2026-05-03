import { z } from "zod";

export const watchlistIdSchema = z.object({
  id: z.string().min(1, "Actor ID is required"),
});

export const validateWatchlistId = (id: string) => {
  return watchlistIdSchema.parse({ id });
};