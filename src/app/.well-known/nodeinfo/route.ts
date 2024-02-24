export const dynamic = "force-dynamic";

const body = (baseUrl: string) =>
  JSON.stringify({
    links: [
      {
        rel: "http://nodeinfo.diaspora.software/ns/schema/2.0",
        href: `${baseUrl}/api/nodeinfo/2.0`,
      },
    ],
  });

export function GET(request: Request) {
  const url = new URL(request.url);
  return new Response(body(`${url.protocol}//${url.host}`), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
