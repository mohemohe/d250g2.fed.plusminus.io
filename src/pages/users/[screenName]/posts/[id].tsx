import { useRouter } from "next/router";
import Image from "next/image";
import d250g2Image from "@/../public/assets/attachments/3602195819_492a5b43b5_o.jpg";
import { d250g2 } from "@/util/d250g2";

function Index() {
  const router = useRouter();

  if (d250g2.screenName == null || router.query.screenName == null || router.query.id == null) {
    return <></>;
  }

  if (router.query.screenName !== d250g2.screenName) {
    return <h1>404 Not found</h1>;
  }
  if (router.query.id !== "1") {
    return <h1>404 Not found</h1>;
  }

  return (
    <>
      <p><a href={d250g2.url}>{d250g2.urlLabel}</a></p>
      <Image
        src={d250g2Image}
        alt={d250g2.urlLabel}
      />
      <hr />
      <p>Original Picture by Eggs&Beer (<a href="https://www.flickr.com/photos/38449766@N03/3602195819/">https://www.flickr.com/photos/38449766@N03/3602195819/</a>)</p>
    </>
  )
}

export default Index;
