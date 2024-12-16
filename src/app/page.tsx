import { Categories, Container, SortPopUp, Title } from "@/components/shared";
import { Filters } from "@/components/shared/filters";
import { TopBar } from "@/components/shared/top-bar";
import { Checkbox, Dialog, Drawer, Popover, Select, Sheet, Skeleton, Slider, Textarea } from "@/components/ui";

export default function Home() {
  return <>

    <Container className="mt-8">
      <Title text="Все экземпляры" className="font-extrabold" />
      <TopBar />
    </Container>

    <Container className="pb-14">
      <div className="flex gap-[60px]">
        <div className="w-[170px]">
          <Filters />
        </div>

        <div>
          <div className="flex flex-col gap-16">
            Список товаров
          </div>
        </div>
      </div>
    </Container>

  </>
}
