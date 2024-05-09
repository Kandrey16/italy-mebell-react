import { useState, useEffect } from "react";

export default function FeaturedImageGallery({
  mainImageUrl,
  additionalImages,
}) {
  const [active, setActive] = useState(mainImageUrl);
  const [allImages, setAllImages] = useState([mainImageUrl]); // Первоначально установить состояние в mainImageUrl

  useEffect(() => {
    if (mainImageUrl && additionalImages) {
      const additionalImagesUrls = additionalImages.map(
        (imageData) =>
          `${import.meta.env.VITE_APP_API_URL}/${imageData.url_image}`
      );
      setAllImages([mainImageUrl, ...additionalImagesUrls]); // Обновление состояния allImages
      setActive(mainImageUrl); // Установка активного изображения
    }
  }, [mainImageUrl, additionalImages]);

  return (
    <div className="grid gap-4">
      <div className="flex justify-center">
        <img
          className="h-auto max-h-[560px] w-auto max-w-full rounded-lg object-cover object-center aspect-w-1 aspect-h-1"
          src={active}
          alt="Featured product"
        />
      </div>
      {allImages.length > 1 && (
        <div className="grid grid-cols-5 gap-4">
          {allImages.map((imgelink, index) => (
            <div key={index}>
              <img
                onClick={() => setActive(imgelink)}
                src={imgelink}
                className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center aspect-w-1 aspect-h-1"
                alt={`Product image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
