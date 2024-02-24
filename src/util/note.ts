import { d250g2 } from "@/util/d250g2";

export const d250g2Note = (baseUrl: string, image: string | null) => ({
  id: `${baseUrl}/api/activitypub/${d250g2.screenName}/notes/1`,
  type: "Note",
  url: `${baseUrl}/users/${d250g2.screenName}/posts/1`,
  published: "2024-02-24T19:12:41.516Z",
  content: `<p><a href="${d250g2.url}">${d250g2.urlLabel}</a></p>`,
  attachment: image
    ? [
        {
          type: "Image",
          mediaType: "image/jpeg",
          url: image,
          name: "d250g2",
        },
      ]
    : undefined,
  attributedTo: `${baseUrl}/api/activitypub/${d250g2.screenName}`,
  to: ["https://www.w3.org/ns/activitystreams#Public"],
  cc: [`${baseUrl}/api/activitypub/${d250g2.screenName}/followers`],
});
