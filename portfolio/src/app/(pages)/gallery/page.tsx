import { getCollections } from "@/app/api/gallery/collectionsController";
import CollectionCard from "@/app/components/molecules/collectionCard/collectionCard";
import PageHeader from "@/app/components/molecules/pageHeader/pageHeader";
import GridLayout from "@/app/components/templates/gridLayout/gridLayout";

export default async function Gallery() {
  const collections = await getCollections();

  return (
    <>
      <PageHeader title="Gallery"></PageHeader>
      <h1>Collections</h1>
      <GridLayout>
        {collections.map((collection) => {
          return <CollectionCard key={collection.id} {...collection} />;
        })}
      </GridLayout>
      <h1>Featured Images</h1>
    </>
  );
}
