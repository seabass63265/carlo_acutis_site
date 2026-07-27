export type FacebookPost = {
  id: string;
  message?: string;
  created_time: string;
  permalink_url: string;
  full_picture?: string;
};

const FIELDS = "id,message,created_time,permalink_url,full_picture";

/**
 * Fetches the Facebook Page's most recent posts server-side via the Graph API.
 * Requires FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN to be set. Returns
 * null (never throws) when the credentials are missing or the request fails,
 * so callers can fall back to static content instead of breaking the page.
 */
export async function getFacebookPosts(limit = 3): Promise<FacebookPost[] | null> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!pageId || !token) return null;

  try {
    // Fetch a larger raw batch since photo/video-only posts (no message text)
    // get filtered out below but still count against the API's own limit.
    const rawLimit = Math.max(limit * 4, 25);
    const url = `https://graph.facebook.com/v21.0/${pageId}/posts?fields=${FIELDS}&limit=${rawLimit}&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const data = await res.json();
    const posts: FacebookPost[] = data?.data ?? [];
    return posts.filter((post) => post.message).slice(0, limit);
  } catch {
    return null;
  }
}
