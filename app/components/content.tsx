import { useRef } from 'react';
import { ClientOnly } from 'remix-utils';

import type { GetPageQuery } from '~/generated/schema.server';
import { useMarkdownHeadings } from '~/hooks/useMarkdownHeadings';

type ContentProps = GetPageQuery & {
  disableToc?: boolean;
  isInPreview?: boolean;
};

import { RichTextView } from './rich-text-view';
import { TableOfContents } from './table-of-contents';

export function Content({ page, disableToc, isInPreview }: ContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { links } = useMarkdownHeadings({
    content: page?.content?.markdown as string,
  });

  const hasLinks = links && links?.length > 0;

  return (
    <div className="flex items-start">
      {isInPreview && (
        <div className="h-16 w-full bg-red-500 text-red-300">
          We are in preview mode
        </div>
      )}

      <div ref={contentRef} className="w-full max-w-[720px] lg:pr-12">
        <RichTextView page={page} />
      </div>

      {hasLinks && !disableToc && (
        <ClientOnly>
          <TableOfContents
            contentRef={contentRef}
            links={links}
            labelText="Table of Contents"
            className="sticky top-32 hidden lg:block"
          />
        </ClientOnly>
      )}
    </div>
  );
}
