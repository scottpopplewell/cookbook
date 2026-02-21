import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

// Types matching your Contentful content model
export interface ContentfulRecipe {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  description: string;
  size: string;
  images: { id: string; url: string }[];
  ingredients: string;
  body: string;
}

export interface ContentfulRecipeComment {
  id: string;
  date: string;
  body: string;
}

export interface Recipe extends ContentfulRecipe {
  comments: ContentfulRecipeComment[];
}

// Fetch all recipes (for homepage and getStaticPaths)
export async function getAllRecipes(): Promise<Recipe[]> {
  const entries = await client.getEntries({
    content_type: "recipe",
    include: 2, // Include linked entries (comments, images)
  });

  return entries.items.map((item: any) => mapRecipe(item));
}

// Fetch a single recipe by ID
export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const entry = await client.getEntry(id, {
      include: 2, // Include linked entries
    });
    return mapRecipe(entry);
  } catch {
    return null;
  }
}

// Map Contentful entry to Recipe type
function mapRecipe(entry: any): Recipe {

  // Extract comments from the recipe's reference field
  const comments = (entry.fields.comments || []).map((comment: any) => ({
    id: comment.sys.id,
    date: formatDate(comment.fields?.date),
    body: comment.fields?.body?.body || comment.fields?.body || "",
  }));
  
  return {
    id: entry.sys.id,
    title: entry.fields.title || "",
    author: entry.fields.author || "",
    createdAt: formatDate(entry.sys.createdAt),
    description: entry.fields.description || "",
    size: entry.fields.size || "",
    images: (entry.fields.images || []).map((img: any) => ({
      id: img.sys.id,
      url: img.fields?.file?.url ? `https:${img.fields.file.url}` : "",
    })),
    ingredients: entry.fields.ingredients?.ingredients || entry.fields.ingredients || "",
    body: entry.fields.body?.body || entry.fields.body || "",
    comments,
  };
}

// Format date to "MMMM DD, YYYY"
function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
