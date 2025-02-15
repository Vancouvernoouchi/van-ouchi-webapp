"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * 何にでも使えるローディングスピナーコンポーネント
 *
 * @param message {string}　- 「読み込み中」等の任意のメッセージを指定可能
 * @param className {string}　- 大きさや色等の指定可能
 */
const Loader = ({
  message = "",
  className = "w-12 h-12 border-bloom-blue",
}: {
  message?: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* スピナー */}
      <motion.div
        className={cn(className, "border-4 border-t-transparent rounded-full")}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      {/* メッセージ */}
      <p className="tracking-widest text-bloom-blue font-medium">{message}</p>
    </div>
  );
};

export { Loader };
