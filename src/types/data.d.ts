declare module "vegan" {
  export interface MenuItem {
    menu_item: string;
    ingredients: string[];
  }

  export interface Restaurant {
    name: string;
    address: string | null;
    category: string;
    menu_type: string;
    certification: string;
    tel: string | null;
    lat: string;
    lng: string;
    id: string;
    menus: MenuItem[];
    vegan_flags: string[];
    allergy_flags: string[];
  }

  export interface RestaurantData {
    restaurants: Restaurant[];
  }
}
