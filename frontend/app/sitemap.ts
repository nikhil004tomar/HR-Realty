import type { MetadataRoute } from "next";

const BASE_URL = "https://www.thehrrealty.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/bulk-land`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/dholera-sir`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/dholera-sir/connectivity`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-sir/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-sir/running-completed-projects`,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-sir/dmic`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-sir/dfc`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-sir/gidb`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-sir/drda`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-sir/maps`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${BASE_URL}/channel-partner`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/sell-your-property`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${BASE_URL}/careers`,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    {
      url: `${BASE_URL}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${BASE_URL}/terms-and-conditions`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}