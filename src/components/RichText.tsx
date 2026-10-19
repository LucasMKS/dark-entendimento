import React from 'react';

interface RichTextProps {
  text?: string;
  className?: string;
}

/**
 * Renders strings containing **bold** or *italic* markdown syntax
 * into styled React elements without literal asterisks.
 */
export const RichText: React.FC<RichTextProps> = ({ text, className }) => {
  if (!text) return null;

  // Split by **bold** first, then by *italic*
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return (
            <strong key={i} className="font-semibold text-[#e6c885]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return (
            <em key={i} className="italic text-stone-100">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
};
