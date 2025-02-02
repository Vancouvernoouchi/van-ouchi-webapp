import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * ダイアログフレームコンポーネント
 *
 * @param triggerLabel {string} - トリガーボタンのラベル
 * @param title {string} - ダイアログタイトル
 * @param discription {string}　- ダイアログ説明
 * @param contentsArea {ReactNode}　- ダイアログコンテンツエリア
 * @param footerArea {ReactNode}　- 下部ボタン配置エリア
 */
function DialogFrame({
  triggerLabel,
  title,
  discription,
  contentsArea,
  footerArea,
}: {
  triggerLabel: string;
  title: string;
  discription: string;
  contentsArea: ReactNode;
  footerArea: ReactNode;
}) {
  return (
    <>
      <div className="block sm:hidden">
        <DialogSP
          triggerLabel={triggerLabel}
          title={title}
          discription={discription}
          footerArea={footerArea}
          contentsArea={contentsArea}
        />
      </div>
      <div className="hidden sm:block">
        <DialogPC
          triggerLabel={triggerLabel}
          title={title}
          discription={discription}
          footerArea={footerArea}
          contentsArea={contentsArea}
        />
      </div>
    </>
  );
}

/**
 * PC用ダイアログフレームコンポーネント
 */
function DialogPC({
  triggerLabel,
  title,
  discription,
  contentsArea,
  footerArea,
}: {
  triggerLabel: string;
  title: string;
  discription: string;
  contentsArea: ReactNode;
  footerArea: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] flex flex-col gap-0 p-0">
        <DialogHeader className="flex items-center justify-center gap-1 border-b px-6 py-3">
          {/* タイトル */}
          <DialogTitle>{title}</DialogTitle>
          {/* 説明 */}
          <DialogDescription>{discription}</DialogDescription>
        </DialogHeader>
        {/* コンテンツ */}
        <div className="h-[400px] overflow-y-auto p-6">{contentsArea}</div>
        {/* フッターエリア */}
        <DialogFooter className="p-6 border-t">{footerArea}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * スマホ用ダイアログフレームコンポーネント
 */
function DialogSP({
  triggerLabel,
  title,
  discription,
  contentsArea,
  footerArea,
}: {
  triggerLabel: string;
  title: string;
  discription: string;
  contentsArea: ReactNode;
  footerArea: ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="flex flex-col gap-0 p-0">
        <SheetHeader className="flex items-center justify-center border-b p-2">
          {/* タイトル */}
          <SheetTitle>{title}</SheetTitle>
          {/* 説明 */}
          <SheetDescription className="mt-0 text-xs">
            {discription}
          </SheetDescription>
        </SheetHeader>
        {/* コンテンツ */}
        <div className="overflow-y-auto max-h-[70vh] p-4">{contentsArea}</div>
        {/* フッターエリア */}
        <SheetFooter className="p-4 border-t">{footerArea}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { DialogFrame };
