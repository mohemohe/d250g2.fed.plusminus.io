import { d250g2 } from "@/util/d250g2";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: { screenName: string } }
) {
  const { screenName } = params;
  if (!screenName) {
    return new Response("Bad request", { status: 400 });
  }
  if (screenName !== "_" && screenName !== d250g2.screenName) {
    return new Response("Not found", { status: 404 });
  }

  return new Response("OK");
}
