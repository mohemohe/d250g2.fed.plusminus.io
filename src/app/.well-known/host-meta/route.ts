export const dynamic = "force-dynamic";

const body = (baseUrl: string) => `
  <XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
    <Link rel="lrdd" type="application/xrd+xml" template="${baseUrl}/.well-known/webfinger?resource={uri}"/>
  </XRD>
`;

export function GET(request: Request) {
  const url = new URL(request.url);
  return new Response(body(`${url.protocol}//${url.host}`), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
