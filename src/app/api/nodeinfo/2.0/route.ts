export const dynamic = "force-dynamic";

const body = () =>
  JSON.stringify({
    version: "2.0",
    software: { name: "d250g2", version: "250.2" },
    protocols: ["activitypub"],
    services: { inbound: [], outbound: [] },
    openRegistrations: false,
    usage: { users: {} },
    metadata: {
      name: "",
      description: "",
      maintainer: {
        name: "mohemohe",
        email: "mohemohe@users.noreply.github.com",
      },
      langs: ["ja"],
      ToSUrl: "",
      repositoryUrl: "https://github.com/mohemohe/d250g2.fed.plusminus.io",
      feedbackUrl:
        "https://github.com/mohemohe/d250g2.fed.plusminus.io/issues/new",
      announcements: [],
    },
  });

export function GET(request: Request) {
  return new Response(body(), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
