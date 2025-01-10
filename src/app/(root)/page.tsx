import { TopBar, Container, ProductsGroupList, Title, Filters } from "@/components/shared";
import { prisma } from "../../../prisma/prisma-client";
import { findSneakers } from "@/lib/find-sneakers";

export default async function Home({ searchParams }: any) {
  const searchParams_ = await searchParams
  const brands = await findSneakers(searchParams_)

  return <>

    <TopBar brands={brands.filter((brand) => brand.sneakers.length > 0)} />
    <Container className="pb-14">
      <div className="flex gap-[60px] justify-between">
        <div className="w-[170px]">
          <Filters />
        </div>
        <div className="flex flex-col gap-10">
          {brands && brands.map((brand) =>
            <ProductsGroupList title={brand.name} items={brand.sneakers} BrandId={brand.id} key={brand.name} />
          )}
        </div>
      </div>
    </Container>

  </>
}
