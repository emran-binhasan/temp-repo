import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Markdown = ({ content, classStyle }) => {
	return (
		<div className="relative">
			<ReactMarkdown
				className={`leading-6 text-justify font-sans [word-spacing:1.5px] lg:[word-spacing:4px] text-black break-words whitespace-pre-line ${classStyle}`}
				remarkPlugins={[remarkGfm]}
				components={{
					br: ({ node, ...props }) => <br className="leading-6" />,
					h1: ({ node, ...props }) => (
						<h1
							className="mb-2 text-3xl font-bold text-black"
							{...props}
						/>
					),
					h2: ({ node, ...props }) => (
						<h2
							className="text-2xl font-semibold text-black"
							{...props}
						/>
					),
					h3: ({ node, ...props }) => (
						<h3
							className="mb-1 text-xl font-semibold text-black"
							{...props}
						/>
					),
					h4: ({ node, ...props }) => (
						<h4
							className="text-black text-justify font-medium text-[18px] leading-6 [word-spacing:5px]"
							{...props}
						/>
					),
					p: ({ node, ...props }) => (
						<p
							className=""
							{...props}
						/>
					),
					ul: ({ node, ...props }) => (
						<ul
							className="mb-4 ml-5 -space-y-6 list-disc"
							{...props}
						/>
					),
					ol: ({ node, ...props }) => (
						<ol
							className="mb-4 ml-5 list-decimal"
							{...props}
						/>
					),
					li: ({ node, ...props }) => (
						<li
							className=""
							{...props}
						/>
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};

export default Markdown;
