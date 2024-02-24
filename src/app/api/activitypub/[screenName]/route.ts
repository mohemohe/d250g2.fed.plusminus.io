import { getKey } from "@/util/key";
import { d250g2 } from "@/util/d250g2";

export const dynamic = "force-dynamic";

const body = (
  baseUrl: string,
  screenName: string,
  summary: string,
  icon: string | null,
  image: string | null,
  publicKeyPem: string
) =>
  JSON.stringify({
    "@context": [
      "https://www.w3.org/ns/activitystreams",
      {
        featured: {
          "@id": "http://joinmastodon.org/ns#featured",
          "@type": "@id",
        },
      },
    ],
    id: `${baseUrl}/api/activitypub/${screenName}`,
    type: "Person",
    preferredUsername: screenName,
    name: screenName,
    summary: summary,
    inbox: `${baseUrl}/api/activitypub/${screenName}/inbox`,
    outbox: `${baseUrl}/api/activitypub/${screenName}/outbox`,
    featured: `${baseUrl}/api/activitypub/${screenName}/collections/featured`,
    endpoints: { sharedInbox: `${baseUrl}/api/activitypub/_/inbox` },
    url: "",
    icon: icon
      ? {
          type: "Image",
          mediaType: "image/png",
          url: icon,
        }
      : {},
    image: image
      ? {
          type: "Image",
          mediaType: "image/jpg",
          url: image,
        }
      : {},
    discoverable: true,
    publicKey: {
      id: `${baseUrl}/users/${screenName}#main-key`,
      owner: `${baseUrl}/users/${screenName}`,
      publicKeyPem,
    },
  });

export async function GET(
  request: Request,
  { params }: { params: { screenName: string } }
) {
  const { screenName } = params;
  if (!screenName) {
    return new Response("Bad request", { status: 400 });
  }
  if (screenName !== d250g2.screenName) {
    return new Response("Not found", { status: 404 });
  }

  const url = new URL(request.url!);
  const summary = `<p><a href="${d250g2.url}">${d250g2.urlLabel}</a></p><p>Original Picture by Eggs&Beer (<a href="https://www.flickr.com/photos/38449766@N03/3602195819/">https://www.flickr.com/photos/38449766@N03/3602195819/</a>)</p>`;
  return new Response(
    body(
      `${url.protocol}//${url.host}`,
      screenName,
      summary,
      `${url.protocol}//${url.host}/assets/icons/${d250g2.screenName}.jpg`,
      `${url.protocol}//${url.host}/assets/attachments/3602195819_492a5b43b5_o.jpg`,
      await getKey(screenName)
    ),
    {
      headers: {
        "Content-Type": `application/ld+json; profile="https://www.w3.org/ns/activitystreams"`,
      },
    }
  );
}
