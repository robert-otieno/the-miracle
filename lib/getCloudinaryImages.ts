import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,  
});

type CloudinaryImage = {
  public_id: string;
  secure_url: string;
};

export async function getCloudinaryImages(): Promise<CloudinaryImage[]> {
  try {
    const result = await cloudinary.v2.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result.resources.map((resource: any) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      
    }));
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    return [];
  }
}