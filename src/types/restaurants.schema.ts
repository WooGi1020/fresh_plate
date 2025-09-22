import z from "zod";

export const MenuSchema = z.object({
  id: z.number(),
  menuItem: z.string().min(1),
  ingredients: z.array(z.string()).default([]),
});

export const RestaurantSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  address: z.string().nullable(),
  category: z.array(z.string().min(1)).default([]),
  menuType: z.string().nullable(),
  certification: z.string().nullable(),
  tel: z.string().nullable(),
  lat: z.string().nullable(),
  lng: z.string().nullable(),
  veganFlags: z.array(z.string()).default([]),
  allergyFlags: z.array(z.string()).default([]),
  avgRating: z.number().nullable(),
  recommended: z.boolean().nullable(),
  warning: z.boolean().nullable(),
  menus: z.array(MenuSchema).default([]),
});

export type Restaurant = z.infer<typeof RestaurantSchema>;
