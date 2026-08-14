import Image from "next/image";

export function SiteLogo({
  className = "h-14 w-auto object-contain md:h-16",
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
