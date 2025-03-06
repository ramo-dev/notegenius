import Link from "next/link";
import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const NonMemoizedMarkdown = ({
  children,
  className,
}: {
  children: string;
  className?: string | null | undefined;
}) => {
  const components = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : null;
      return !inline && match ? (
        <div className="my-2 w-full">
          {/* Display the Language Name */}
          <div className="text-xs font-bold px-3 py-2 -mb-2 bg-zinc-900 text-gray-300 rounded-t-md w-full">
            {language}
          </div>
          <SyntaxHighlighter
            {...props}
            style={oneDark}
            language={language}
            PreTag="div"
            className="text-sm !rounded-t-none min-w-[400px] w-full"
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          className={`${className} rounded-t-none text-sm bg-zinc-600 dark:bg-zinc-800 py-0.5 px-1 rounded-b-md rounded-x-md`}
          {...props}
        >
          {children}
        </code>
      );
    },
    img: ({ node, src, alt, ...props }: any) => (
      <img
        src={src}
        alt={alt || "Markdown Image"}
        className="max-w-full h-auto rounded-lg my-2"
        {...props}
      />
    ),
    ol: ({ node, children, ...props }: any) => (
      <ol className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ol>
    ),
    li: ({ node, children, ...props }: any) => (
      <li className="py-2" {...props}>
        {children}
      </li>
    ),
    h1: ({ node, children, ...props }: any) => (
      <p className="py-2 font-bold text-3xl" {...props}>
        {children}
      </p>
    ),
    h2: ({ node, children, ...props }: any) => (
      <p className="py-2 font-bold text-2xl" {...props}>
        {children}
      </p>
    ),
    h3: ({ node, children, ...props }: any) => (
      <p className="py-2 font-bold text-xl" {...props}>
        {children}
      </p>
    ),
    ul: ({ node, children, ...props }: any) => (
      <ul className="list-decimal list-outside ml-4 py-2" {...props}>
        {children}
      </ul>
    ),
    strong: ({ node, children, ...props }: any) => (
      <span className="font-semibold text-md" {...props}>
        {children}
      </span>
    ),
    a: ({ node, children, ...props }: any) => (
      <Link
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    ),
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);
