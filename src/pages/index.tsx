import { useRouter } from "next/router";
import { d250g2 } from "@/util/d250g2";
import { useEffect } from "react";

function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/users/${d250g2.screenName}/posts/1`);
  }, []);

  return (
    <>
    </>
  )
}

export default Index;
