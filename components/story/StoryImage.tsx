import Image from "next/image";

type StoryImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  position?: string;
  overlay?: boolean;
};

export default function StoryImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "100vw",
  position = "center",
  overlay = false,
}: StoryImageProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[#E7E2D6] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: position }}
      />

      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#151515]/60 via-transparent to-transparent"
        />
      )}
    </div>
  );
}
