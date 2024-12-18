import { TopBar, Container, ProductsGroupList, Title, Filters } from "@/components/shared";

export default function Home() {
  return <>

    <TopBar />
    <Container className="mt-8">
      <Title text="Все экземпляры" className="font-extrabold" />
    </Container>

    <Container className="pb-14">
      <div className="flex gap-[60px]">
        <div className="w-[170px]">
          <Filters />
        </div>

        <div>
          <div className="flex flex-col gap-10">
            <ProductsGroupList title={"Nike"} items={[
              {
                id: 1,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/492/500_500_1/vq30ykohy9shilbicqj8uzjy53k505yw.jpg",
                ingredients: [{ name: 'нат.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Dunk Low Retro",
                items: [{ price: 21999 }]
              },
              {
                id: 2,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/088/500_500_1/u17rsinz3o3uifbodlz93ys40kej5x3t.jpg",
                ingredients: [{ name: 'нат.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Giannis Immortality 4",
                items: [{ price: 15999 }]
              },
              {
                id: 3,
                imageUrl: "https://static.street-beat.ru/upload/iblock/f19/qk3pmkmume787uye3f0tvx400fi40avh.JPG",
                ingredients: [{ name: 'Нат.кожа/Синт.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Dunk Low Pacific Moss",
                items: [{ price: 11999 }]
              },
              {
                id: 4,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/af0/500_500_1/iv38ccaukpzjugb0ygzy9789pqo34407.jpg",
                ingredients: [{ name: 'Нат.кожа/Синт.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Air More Uptempo 96",
                items: [{ price: 26999 }]
              },
              {
                id: 7,
                imageUrl: 'https://static.street-beat.ru/upload/resize_cache/iblock/3a8/500_500_1/v4pkrf7r4ilda60zo4hjuhpu1kze962u.jpg',
                ingredients: [{ name: 'Нат.кожа/Синт.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Full Force Lo Year of the Dragon",
                items: [{ price: 11199 }]
              },
              {
                id: 6,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/c12/500_500_1/xltxybzr3fes4lrjh6ciy3hx9wilax4c.JPG",
                ingredients: [{ name: 'Нат.кожа/Синт.кожа/Текстиль' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Court Borough Mid 2",
                items: [{ price: 5499 }]
              }
            ]} categoryId={1} />
            <ProductsGroupList title={"Adidas"} items={[
              {
                id: 1,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/492/500_500_1/vq30ykohy9shilbicqj8uzjy53k505yw.jpg",
                ingredients: [{ name: 'нат.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Dunk Low Retro",
                items: [{ price: 21999 }]
              },
              {
                id: 2,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/088/500_500_1/u17rsinz3o3uifbodlz93ys40kej5x3t.jpg",
                ingredients: [{ name: 'нат.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Giannis Immortality 4",
                items: [{ price: 15999 }]
              },
              {
                id: 3,
                imageUrl: "https://static.street-beat.ru/upload/iblock/f19/qk3pmkmume787uye3f0tvx400fi40avh.JPG",
                ingredients: [{ name: 'Нат.кожа/Синт.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Dunk Low Pacific Moss",
                items: [{ price: 11999 }]
              },
              {
                id: 4,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/af0/500_500_1/iv38ccaukpzjugb0ygzy9789pqo34407.jpg",
                ingredients: [{ name: 'Нат.кожа/Синт.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Air More Uptempo 96",
                items: [{ price: 26999 }]
              },
              {
                id: 7,
                imageUrl: 'https://static.street-beat.ru/upload/resize_cache/iblock/3a8/500_500_1/v4pkrf7r4ilda60zo4hjuhpu1kze962u.jpg',
                ingredients: [{ name: 'Нат.кожа/Синт.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Full Force Lo Year of the Dragon",
                items: [{ price: 11199 }]
              },
              {
                id: 6,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/c12/500_500_1/xltxybzr3fes4lrjh6ciy3hx9wilax4c.JPG",
                ingredients: [{ name: 'Нат.кожа/Синт.кожа/Текстиль' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Court Borough Mid 2",
                items: [{ price: 5499 }]
              }
            ]} categoryId={2} />
            <ProductsGroupList title={"New Balance"} items={[
              {
                id: 1,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/492/500_500_1/vq30ykohy9shilbicqj8uzjy53k505yw.jpg",
                ingredients: [{ name: 'нат.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Dunk Low Retro",
                items: [{ price: 21999 }]
              },
              {
                id: 2,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/088/500_500_1/u17rsinz3o3uifbodlz93ys40kej5x3t.jpg",
                ingredients: [{ name: 'нат.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Giannis Immortality 4",
                items: [{ price: 15999 }]
              },
              {
                id: 3,
                imageUrl: "https://static.street-beat.ru/upload/iblock/f19/qk3pmkmume787uye3f0tvx400fi40avh.JPG",
                ingredients: [{ name: 'Нат.кожа/Синт.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Dunk Low Pacific Moss",
                items: [{ price: 11999 }]
              },
              {
                id: 4,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/af0/500_500_1/iv38ccaukpzjugb0ygzy9789pqo34407.jpg",
                ingredients: [{ name: 'Нат.кожа/Синт.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Air More Uptempo 96",
                items: [{ price: 26999 }]
              },
              {
                id: 7,
                imageUrl: 'https://static.street-beat.ru/upload/resize_cache/iblock/3a8/500_500_1/v4pkrf7r4ilda60zo4hjuhpu1kze962u.jpg',
                ingredients: [{ name: 'Нат.кожа/Синт.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Full Force Lo Year of the Dragon",
                items: [{ price: 11199 }]
              },
              {
                id: 6,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/c12/500_500_1/xltxybzr3fes4lrjh6ciy3hx9wilax4c.JPG",
                ingredients: [{ name: 'Нат.кожа/Синт.кожа/Текстиль' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Court Borough Mid 2",
                items: [{ price: 5499 }]
              }
            ]} categoryId={3} />
            <ProductsGroupList title={"Other"} items={[
              {
                id: 1,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/492/500_500_1/vq30ykohy9shilbicqj8uzjy53k505yw.jpg",
                ingredients: [{ name: 'нат.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Dunk Low Retro",
                items: [{ price: 21999 }]
              },
              {
                id: 2,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/088/500_500_1/u17rsinz3o3uifbodlz93ys40kej5x3t.jpg",
                ingredients: [{ name: 'нат.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Giannis Immortality 4",
                items: [{ price: 15999 }]
              },
              {
                id: 3,
                imageUrl: "https://static.street-beat.ru/upload/iblock/f19/qk3pmkmume787uye3f0tvx400fi40avh.JPG",
                ingredients: [{ name: 'Нат.кожа/Синт.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Dunk Low Pacific Moss",
                items: [{ price: 11999 }]
              },
              {
                id: 4,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/af0/500_500_1/iv38ccaukpzjugb0ygzy9789pqo34407.jpg",
                ingredients: [{ name: 'Нат.кожа/Синт.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Air More Uptempo 96",
                items: [{ price: 26999 }]
              },
              {
                id: 7,
                imageUrl: 'https://static.street-beat.ru/upload/resize_cache/iblock/3a8/500_500_1/v4pkrf7r4ilda60zo4hjuhpu1kze962u.jpg',
                ingredients: [{ name: 'Нат.кожа/Синт.кожа' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Full Force Lo Year of the Dragon",
                items: [{ price: 11199 }]
              },
              {
                id: 6,
                imageUrl: "https://static.street-beat.ru/upload/resize_cache/iblock/c12/500_500_1/xltxybzr3fes4lrjh6ciy3hx9wilax4c.JPG",
                ingredients: [{ name: 'Нат.кожа/Синт.кожа/Текстиль' }, { name: 'текстиль' }, { name: 'резина' }],
                name: "Nike Court Borough Mid 2",
                items: [{ price: 5499 }]
              }
            ]} categoryId={4} />
          </div>
        </div>
      </div>
    </Container>

  </>
}
