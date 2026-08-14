import Image from "next/image";

export function SiteLogo({
  className = "h-[4.25rem] w-auto object-contain md:h-20",
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
