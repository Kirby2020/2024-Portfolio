import { getCollections } from "@/app/api/gallery/collectionsController";
import CollectionCard from "@/app/components/molecules/collectionCard/collectionCard";
import PageHeader from "@/app/components/molecules/pageHeader/pageHeader";
import GridLayout from "@/app/components/templates/gridLayout/gridLayout";
import Link from "next/link";

export default async function Gallery() {
  const collections = await getCollections();

  return (
    <>
      <PageHeader title="Gallery"></PageHeader>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Collections</h1>
        <Link href={"/gallery/collections/create"}>Add Collection</Link>
      </div>
      <GridLayout>
        {collections.map((collection) => {
          return <CollectionCard key={collection.id} {...collection} />;
        })}
      </GridLayout>
      <h1>Featured Images</h1>
    </>
  );
}
