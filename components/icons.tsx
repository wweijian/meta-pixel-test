import type { SVGProps } from "react";

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: "arrow" | "bag" | "check" | "box" | "return" | "close" | "plus" | "minus" }) {
  const paths = {
    arrow: <><path d="M4 12h16M14 6l6 6-6 6" /></>,
    bag: <><path d="M5 7h14l1 14H4L5 7Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    box: <><path d="m3 7 9-5 9 5v10l-9 5-9-5V7Z" /><path d="m3 7 9 5 9-5M12 12v10M7 4l10 6" /></>,
    return: <><path d="M4 10h10a6 6 0 0 1 0 12" /><path d="m9 5-5 5 5 5" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    plus: <path d="M5 12h14M12 5v14" />,
    minus: <path d="M5 12h14" />,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
