#!/usr/bin/env python3
"""Check links and images in rendered documentation. Run after quickstatic build."""
import argparse
from functools import lru_cache
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a' and attrs.get('name'):
            self.ids.add(attrs['name'])
        key = 'href' if tag == 'a' else 'src' if tag in ('img', 'source') else None
        if key and attrs.get(key):
            self.links.append((self.getpos()[0], attrs[key]))


@lru_cache(maxsize=None)
def read_page(path):
    return Page(path.read_text())


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path('_quickstatic/public'))
    args = parser.parse_args()
    root = args.root.resolve()
    files = sorted((root / 'docs').rglob('*.html'))
    if not files:
        parser.error(f'No generated documentation under {root}. Run quickstatic build first.')
    failures = []
    checked = 0
    for source in files:
        source_url = '/' + source.relative_to(root).as_posix().removesuffix('index.html')
        for line, link in read_page(source).links:
            url = urlsplit(urljoin(source_url, link))
            if url.scheme or url.netloc:
                continue
            checked += 1
            target = root / unquote(url.path).lstrip('/')
            if target.is_dir():
                target /= 'index.html'
            elif not target.exists() and not target.suffix:
                target /= 'index.html'
            if not target.is_file():
                failures.append((source.relative_to(root), line, link, 'missing target'))
            elif url.fragment and target.suffix == '.html' and unquote(url.fragment) not in read_page(target).ids:
                failures.append((source.relative_to(root), line, link, 'missing fragment'))
    for source, line, link, reason in failures:
        print(f'{source}:{line}: {reason}: {link}')
    print(f'Checked {checked} local links across {len(files)} documentation pages; {len(failures)} failures.')
    return bool(failures)


if __name__ == '__main__':
    raise SystemExit(main())
