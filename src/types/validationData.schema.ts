import z from "zod";

export const MenuSchema = z.object({
  menu_item: z.string().min(1),
  ingredients: z.array(z.string()).default([]),
});

export const RestaurantSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1).nullable().optional(),
  category: z.string().min(1),
  menu_type: z.string().min(1),
  certification: z.string().nullable().optional(),
  tel: z.string().nullable().optional(),
  lat: z.string().or(z.number()).optional(),
  lng: z.string().or(z.number()).optional(),
  id: z.string().min(1),
  menus: z.array(MenuSchema).default([]),
  vegan_flags: z.array(z.string()).default([]),
  allergy_flags: z.array(z.string()).default([]),
});
