import { d250g2 } from "@/util/d250g2";

export const dynamic = "force-dynamic";

const body = () =>
  JSON.stringify({
    "@context": "https://www.w3.org/ns/activitystreams",
    type: "OrderedCollection",
    totalItems: 1,
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

  return new Response(body(), {
    headers: {
      "Content-Type": `application/ld+json; profile="https://www.w3.org/ns/activitystreams"`,
    },
  });
}
