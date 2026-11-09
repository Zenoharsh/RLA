import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * next/link with prefetching off by default. Prefetching requests every link's route as it
 * scrolls into view, which multiplied each page view into dozens of requests and pushed the
 * site past its hosting request limit. Pages are cached, so navigation stays quick without it.
 */
export default function Link({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...props} />;
}
