export const dynamic = "force-dynamic";

const body = (baseUrl: string, acct: string) =>
  JSON.stringify({
    subject: `acct:${acct}`,
    links: [
      {
        rel: "self",
        type: "application/activity+json",
        href: `${baseUrl}/api/activitypub/${acct.split("@")[0]}`,
      },
    ],
  });

export function GET(request: Request) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const resources = params
    .get("resource")
    ?.split(",")
    .map((r) => r.split(/:(.+)/));
  const acct = resources?.find((r) => r[0] === "acct");
  if (!acct) {
    return new Response("Bad request", { status: 400 });
  }
  if (acct[1] !== `d250g2@${url.host}`) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(body(`${url.protocol}//${url.host}`, acct[1]), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
