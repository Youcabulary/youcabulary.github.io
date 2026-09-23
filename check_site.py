"""Check exactly the files included by the GitHub Pages workflow."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent
PAGE_NAMES = ('index.html', 'privacy.html', 'support.html', 'sources.html')
PUBLIC = {ROOT / name for name in (*PAGE_NAMES, '.nojekyll')}
PUBLIC.update(path for path in (ROOT / 'assets').rglob('*') if path.is_file())

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.refs = []
        self.ids = set()
        self.tags = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append(tag)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f"Duplicate ID: {attrs['id']}"
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs:
                self.refs.append(attrs[key])

pages = {}
for path in PUBLIC:
    assert path.is_file() and not path.is_symlink(), f'Missing file or symlink: {path}'
    if path.suffix == '.html':
        text = path.read_text(encoding='utf-8')
        assert text.lower().startswith('<!doctype html>'), path
        page = Page(text)
        assert all(tag in page.tags for tag in ('title', 'main', 'nav')), path
        pages[path] = page

for path, page in pages.items():
    for ref in page.refs:
        url = urlsplit(ref)
        assert url.scheme != 'http' and (not url.netloc or url.scheme == 'https'), f'Insecure URL: {ref}'
        if url.scheme:
            assert url.scheme in ('https', 'mailto'), f'Unexpected URL scheme: {ref}'
            continue
        assert not url.path.startswith('/'), f'Root-relative URL breaks project hosting: {ref}'
        target = path.parent / unquote(url.path) if url.path else path
        assert target in PUBLIC, f'{path.name}: URL outside publishing package: {ref}'
        # Windows accepts mis-cased names; GitHub Pages does not.
        parent = ROOT
        for part in target.relative_to(ROOT).parts:
            assert part in {entry.name for entry in parent.iterdir()}, f'Incorrect path case: {ref}'
            parent = parent / part
        if url.fragment:
            assert target in pages and url.fragment in pages[target].ids, f'Missing fragment: {ref}'

size = sum(path.stat().st_size for path in PUBLIC)
assert size < 1_000_000_000, 'Exceeds GitHub Pages 1 GB limit'
print(f'PASS: {len(pages)} pages, {len(PUBLIC)} public files, {size:,} bytes; links, case, fragments, HTTPS-safe URLs and project paths.')
