import { CardFrame, ListPageFrame } from "@/components/common/frame";

const ExamplePage = () => {
  return (
    <ListPageFrame
      cardArea={<CardArea />}
      // strapiのmeta.paginationをここで渡す
      pagination={{
        page: 1,
        pageCount: 1,
        pageSize: 25,
        total: 1,
      }}
    />
  );
};

const CardArea = () => {
  return (
    <CardFrame
      linkTo="/example/id"
      // imageSrc="" // 画像パス
      // imageAlt="" // 画像説明文
      badgeMessage="左上バッヂ"
      badgeStyle="bg-red-500 text-white"
      cardContent={<CardContent />}
    />
  );
};

const CardContent = () => {
  return <div>カードの画像の下の情報がくる</div>;
};

export default ExamplePage;
