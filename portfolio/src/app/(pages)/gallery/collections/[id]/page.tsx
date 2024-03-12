import {
  CollectionWithImages,
  getCollectionWithImages,
} from "@/app/api/gallery/collectionsController";
import ImageCard from "@/app/components/molecules/imageCard/imageCard";
import PageHeader from "@/app/components/molecules/pageHeader/pageHeader";
import GridLayout from "@/app/components/templates/gridLayout/gridLayout";
import { redirect } from "next/navigation";

export default async function Collection({
  params,
}: {
  params: { id: string };
}) {
  const collection: CollectionWithImages = await getCollectionWithImages(
    params.id
  );

  if (!collection) {
    redirect("./");
  }

  return (
    <>
      <PageHeader alignment="center" title={collection.title}></PageHeader>
      <GridLayout>
        {collection.images.map((image) => {
          return <ImageCard key={image.id} {...image}></ImageCard>;
        })}
      </GridLayout>
    </>
  );
}
