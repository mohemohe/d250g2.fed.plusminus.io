import { d250g2 } from "@/util/d250g2";
import { d250g2Note } from "@/util/note";

const body = (baseUrl: string, image: string | null) =>
  JSON.stringify({
    ...d250g2Note(baseUrl, image),
    "@context": ["https://www.w3.org/ns/activitystreams"],
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
  return new Response(
    body(
      `${url.protocol}//${url.host}`,
      `${url.protocol}//${url.host}/assets/attachments/3602195819_492a5b43b5_o.jpg`
    ),
    {
      headers: {
        "Content-Type": "application/activity+json",
      },
    }
  );
}
