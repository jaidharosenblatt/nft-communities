type Props = {
  src?: string;
  srcOnHover?: string;
  alt?: string;
  className?: string;
};
export default function HoverImage({ src, srcOnHover, alt, className }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onMouseOver={(e): void => {
        srcOnHover && (e.currentTarget.src = srcOnHover);
      }}
      onMouseOut={(e): void => {
        srcOnHover && (e.currentTarget.src = src || "");
      }}
    />
  );
}
