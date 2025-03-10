import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, ReactNode } from "react";

type TabProps = {
  tablLabels: string[];
  contents: ReactNode[]; // タブの中にどんなコンテンツが来ても対応できるようにReactNode
};

/**
 * タブコンポーネント
 *
 * @param tabLabels {TabLabels[]}
 * @param contents {ReactNode[]}
 */
function Tab({ tablLabels, contents }: TabProps) {
  return (
    <Tabs defaultValue="0" className="w-full">
      <TabsList
        className={`grid w-full grid-cols-${tablLabels.length} bg-bloom-lightBlue rounded-full`}
      >
        {tablLabels.map((label, index) => (
          <TabsTrigger
            key={index}
            value={index.toString()}
            className="data-[state=active]:bg-white data-[state=active]:text-bloom-blue data-[state=active]:font-semibold rounded-full"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {contents.map((content, index) => (
        <TabsContent key={index} value={index.toString()} className="pt-2">
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export { Tab };
