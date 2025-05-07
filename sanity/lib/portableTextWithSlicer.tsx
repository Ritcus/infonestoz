import { PortableText, PortableTextComponents } from '@portabletext/react';
import type {
  PortableTextBlock,
  PortableTextSpan,
  PortableTextMarkDefinition
} from '@portabletext/types';
import { urlFor } from './image';

// Define our image type since it's not provided by portabletext/types
interface PortableTextImage {
  _type: 'image';
  _key?: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
  hotspot?: any;
  crop?: any;
}

// Define our custom block types
type CustomPortableTextChild = PortableTextSpan | PortableTextImage;

interface CustomPortableTextBlock extends Omit<PortableTextBlock, 'children'> {
  children: CustomPortableTextChild[];
}

interface PortableTextRendererProps {
  content: CustomPortableTextBlock[];
  wordLimit?: number;
  removeImages?: boolean;
  className?: string;
}

export function PortableTextRenderer({
  content,
  wordLimit = 50,
  removeImages = true,
  className = ''
}: PortableTextRendererProps) {
  const { slicedContent, isTruncated } = processContent(content, wordLimit, removeImages);

  const components: PortableTextComponents = {
    types: {
      image: ({ value }: { value: PortableTextImage }) => {
        if (removeImages) return null;
        const imageUrl = value?.asset?._ref 
          ? urlFor(value).width(800).url() 
          : '';
        return imageUrl ? (
          <img
            src={imageUrl}
            alt={value.alt || ''}
            className="portable-text-image"
            loading="lazy"
          />
        ) : null;
      },
    },
  };

  return (
    <div className={className}>
      <PortableText 
        value={slicedContent} 
        components={components} 
      />
    </div>
  );
}

// Helper function to process content with proper typing
function processContent(
  content: CustomPortableTextBlock[],
  wordLimit: number,
  removeImages: boolean
): { slicedContent: CustomPortableTextBlock[]; isTruncated: boolean } {
  if (!content) return { slicedContent: [], isTruncated: false };

  let wordCount = 0;
  const slicedContent: CustomPortableTextBlock[] = [];
  let isTruncated = false;

  for (const block of content) {
    if (wordCount >= wordLimit) {
      isTruncated = true;
      break;
    }

    // Handle image blocks
    if (block._type === 'image') {
      if (!removeImages) {
        slicedContent.push(block);
      }
      continue;
    }

    // Skip if not a text block or missing children
    if (block._type !== 'block' || !block.children) {
      slicedContent.push(block);
      continue;
    }

    const newBlock: CustomPortableTextBlock = {
      ...block,
      children: []
    };

    for (const child of block.children) {
      if (wordCount >= wordLimit) {
        isTruncated = true;
        break;
      }

      if (child._type === 'span' && child.text) {
        const words = child.text.split(/\s+/).filter(Boolean);
        const remaining = wordLimit - wordCount;
        const wordsToTake = Math.min(remaining, words.length);

        if (wordsToTake > 0) {
          newBlock.children.push({
            ...child,
            text: words.slice(0, wordsToTake).join(' ') + 
                 (wordsToTake < words.length ? '...' : '')
          });
          wordCount += wordsToTake;
        }
      } else {
        // Preserve non-span children (like images)
        newBlock.children.push(child);
      }
    }

    if (newBlock.children.length > 0) {
      slicedContent.push(newBlock);
    }
  }

  return { slicedContent, isTruncated };
}

// Helper to convert any content to our custom type
export function toCustomPortableText(content: any[]): CustomPortableTextBlock[] {
  return content.map(block => ({
    ...block,
    children: block.children?.map((child: any) => {
      if (child._type === 'span') {
        return {
          _type: 'span',
          _key: child._key,
          text: child.text || '',
          marks: child.marks || []
        } as PortableTextSpan;
      }
      if (child._type === 'image') {
        return {
          _type: 'image',
          _key: child._key,
          asset: child.asset,
          alt: child.alt,
          hotspot: child.hotspot,
          crop: child.crop
        } as PortableTextImage;
      }
      return child;
    }) || []
  }));
}