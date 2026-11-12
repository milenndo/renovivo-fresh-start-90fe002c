import { Fragment, type ReactNode } from 'react';

// Render the supported editorial Markdown as React nodes; never execute HTML.
function inline(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : <Fragment key={index}>{part}</Fragment>
  );
}

export default function BlogContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const blocks: ReactNode[] = [];
  const cells = (line: string) => line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const key = i;
    if (line.startsWith('### ')) {
      blocks.push(<h3 key={key}>{inline(line.slice(4))}</h3>);
    } else if (line.startsWith('## ')) {
      blocks.push(<h2 key={key}>{inline(line.slice(3))}</h2>);
    } else if (line === '---') {
      blocks.push(<hr key={key} />);
    } else if (line.startsWith('|') && /^\|?[\s:|-]+$/.test(lines[i + 1] || '')) {
      const header = cells(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(cells(lines[i++]));
      i--;
      blocks.push(<div key={key} className="overflow-x-auto my-6" role="region" aria-label="Таблица с информация" tabIndex={0}>
        <table className="w-full text-sm"><thead><tr>{header.map((cell, j) => <th key={j} scope="col">{inline(cell)}</th>)}</tr></thead>
          <tbody>{rows.map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}>{inline(cell)}</td>)}</tr>)}</tbody>
        </table>
      </div>);
    } else if (/^(- |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const pattern = ordered ? /^\d+\. / : /^- /;
      const items: ReactNode[] = [];
      while (i < lines.length && pattern.test(lines[i].trim())) {
        items.push(<li key={i}>{inline(lines[i].trim().replace(pattern, ''))}</li>);
        i++;
      }
      i--;
      blocks.push(ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>);
    } else {
      blocks.push(<p key={key}>{inline(line)}</p>);
    }
  }
  return <>{blocks}</>;
}
