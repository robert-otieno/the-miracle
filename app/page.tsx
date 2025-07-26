import { getCloudinaryImages } from "@/lib/getCloudinaryImages";
import HomeClient from "./components/home-client";
import AudioPlayer from "./components/audio-player";

export default async function Home() {
  const results = await getCloudinaryImages();

  const reducedResults = results.map((result) => ({
    publicId: result.public_id,
    secureUrl: result.secure_url,
  }));

  const images = reducedResults.map((image) => {
    return {
      publicId: image.publicId,
      secureUrl: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${image.publicId}`,
    };
  });

  return (
    <>
      <HomeClient images={images} />
      <AudioPlayer />
    </>
  );
}
