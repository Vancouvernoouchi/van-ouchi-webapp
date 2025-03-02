import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";

function MarkdownRenderer({ content }: { readonly content: string }) {
  if (!content) return null;

  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-bloom-blue hover:opacity-80 underline "
            />
          ),
          img: ({ node, ...props }) => (
            <div className="my-4 flex justify-center">
              <img {...props} className="rounded-lg max-w-full h-auto" />
            </div>
          ),
          p: ({ node, children, ...props }) => (
            <p
              {...props}
              className="text-sm sm:text-base leading-loose tracking-wider"
            >
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="inline-block list-disc pl-4 ml-2 space-y-1 marker:text-bloom-blue text-sm sm:text-base">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 marker:text-bloom-balck text-sm sm:text-base">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-sm sm:text-base">{children}</li>
          ),
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold border-b pb-2">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mt-6 mb-2">{children}</h2>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-100 border-b border-gray-300">
              {children}
            </thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-gray-300">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left font-medium">{children}</th>
          ),
          td: ({ children }) => <td className="px-4 py-2">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export { MarkdownRenderer };
