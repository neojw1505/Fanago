import { useState } from "react"
import Image from "next/image"
import fallback from "public/placeholder-event-poster.png"

function ImageWithFallback({ src, alt, fallBackSrc = fallback.src }) {
  const [imageError, setImageError] = useState(false)
  const imgSrc = `http://ec2-18-138-241-145.ap-southeast-1.compute.amazonaws.com:8080/api/v1/media/get/${src}`
  if (src == null)
    return (
      <Image
        className="object-cover"
        src={fallBackSrc}
        alt={alt}
        width={1000}
        height={1000}
        priority={true}
        onError={() => setImageError(true)}
      />
    )
  return (
    <Image
      className="object-cover"
      src={imageError ? fallBackSrc : imgSrc}
      alt={alt}
      width={1000}
      height={1000}
      priority={true}
      onError={() => setImageError(true)}
    />
  )
}

export default ImageWithFallback
