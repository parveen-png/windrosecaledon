import Image from "next/image";

export function SiteLogo({
  className = "h-11 w-auto max-w-[9.5rem] object-contain object-left sm:h-14 sm:max-w-none md:h-16",
}: {
  className?: string;
}) {
  return (
    <Image
      src="/images/logo-windrose-caledon-trails.png"
      alt="Windrose at Caledon Trails"
      width={900}
      height={676}
      className={className}
      priority
    />
  );
}
