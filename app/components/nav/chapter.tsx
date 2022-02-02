import urljoin from "url-join";

import type { NavChapterFragment } from "~/generated/schema.server";
import { Link } from "~/components/link";

export function NavChapter(props: NavChapterFragment) {
  const { title, slug: chapterSlug } = props;

  return (
    <>
      <div className="mb-2">
        <p className="font-bold">{title}</p>
      </div>

      {props.pages.length > 0 && (
        <ul>
          {props.pages.map((page) => (
            <li key={page.slug}>
              <Link href={urljoin(chapterSlug, page.slug)}>{page.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
