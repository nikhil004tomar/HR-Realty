export interface Property {
  slug: string;
  title: string;
  location: string;
  price: string;
  type: string;
  area: string;
  possession: string;
  image: string;

  description: string;

  highlights: string[];

  amenities: string[];

  gallery: string[];

  layoutImage?: string;

  mapUrl?: string;
}

export const properties: Property[] = [
  {
    slug: "dholera-metro-city-5017",

    title: "Dholera Metro City 5017",

    location: "Dholera SIR, Gujarat",

    price: "Price on Request",

    type: "Residential Plot",

    area: "1000 Sq. Ft.",

    possession: "Ready",

    image: "/projects/dmc-5017.png",

    description:
      "Dholera Metro City 5017 is a premium residential plot project located in Dholera SIR, Gujarat. The project offers strategically located residential plots with excellent connectivity and future growth potential. It is designed for investors and families looking for a well-planned property opportunity in Dholera Smart City.",

    highlights: [
      "NA / NOC Residential Plots",
      "Strategic Location",
      "Wide Internal Roads",
      "Excellent Connectivity",
      "Clear Documentation",
      "Investment Friendly",
    ],

    amenities: [
      "Wide Roads",
      "Electricity",
      "Street Lighting",
      "Green Spaces",
      "Planned Development",
      "Easy Connectivity",
    ],

    gallery: [
      "/projects/dmc-5017.png",
      "/projects/dmc-5016.png",
      "/projects/dmc-5015.png",
    ],

    layoutImage: "/projects/dmc-5017.png",

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Dholera+SIR+Gujarat",
  },

  {
    slug: "dholera-metro-city-5016",

    title: "Dholera Metro City 5016",

    location: "Dholera SIR, Gujarat",

    price: "Price on Request",

    type: "Residential Plot",

    area: "1000 Sq. Ft.",

    possession: "Ready",

    image: "/projects/dmc-5016.png",

    description:
      "Dholera Metro City 5016 offers residential plots in a strategically planned location at Dholera SIR.",

    highlights: [
      "NA / NOC Residential Plots",
      "Strategic Location",
      "Wide Internal Roads",
      "Excellent Connectivity",
      "Clear Documentation",
      "Investment Friendly",
    ],

    amenities: [
      "Wide Roads",
      "Electricity",
      "Street Lighting",
      "Green Spaces",
      "Planned Development",
      "Easy Connectivity",
    ],

    gallery: [
      "/projects/dmc-5016.png",
      "/projects/dmc-5017.png",
    ],

    layoutImage: "/projects/dmc-5016.png",

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Dholera+SIR+Gujarat",
  },
];