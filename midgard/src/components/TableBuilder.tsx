import React, { useReducer, useEffect, useRef, useState } from 'react';
import {
  Plus, Trash2, Copy, GripVertical, Download, Upload,
  Eye, EyeOff, RotateCcw, RotateCw, AlignLeft, AlignCenter, AlignRight,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface CellStyle {
  bgColor: string;
  color: string;
  textAlign: 'left' | 'center' | 'right';
  fontWeight: 'normal' | 'bold';
  fontSize: string;
  padding: string;
}

interface Cell {
  id: string;
  content: string;
  isHeader: boolean;
  colSpan: number;
  style: Partial<CellStyle>;
}

interface Row {
  id: string;
  isHeader: boolean;
  bgColor: string;
  cells: Cell[];
}

interface TableStyles {
  width: string;
  borderColor: string;
  borderWidth: string;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  zebraStripe: boolean;
  zebraColor: string;
  stickyHeader: boolean;
  fontSize: string;
}

export interface TableData {
  rows: Row[];
  tableStyles: TableStyles;
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT_TABLE_STYLES: TableStyles = {
  width: '100%',
  borderColor: '#cbd5e1',
  borderWidth: '1',
  borderStyle: 'solid',
  zebraStripe: false,
  zebraColor: '#f8fafc',
  stickyHeader: false,
  fontSize: '14',
};

const uid = () => Math.random().toString(36).substr(2, 9);

const makeCell = (isHeader = false): Cell => ({
  id: uid(),
  content: '',
  isHeader,
  colSpan: 1,
  style: {},
});

const makeRow = (cols: number, isHeader = false): Row => ({
  id: uid(),
  isHeader,
  bgColor: '',
  cells: Array.from({ length: cols }, () => makeCell(isHeader)),
});

export const defaultTableData = (): TableData => ({
  rows: [makeRow(4, true), makeRow(4), makeRow(4), makeRow(4)],
  tableStyles: { ...DEFAULT_TABLE_STYLES },
});

// ── HTML / CSV generation ─────────────────────────────────────────────────────

export function generateTableHTML(data: TableData): string {
  const { rows, tableStyles: ts } = data;
  const border = ts.borderStyle !== 'none'
    ? `${ts.borderWidth}px ${ts.borderStyle} ${ts.borderColor}`
    : 'none';
  const tableStyle = `width:${ts.width};border-collapse:collapse;font-size:${ts.fontSize}px;`;
  const headerRows = rows.filter(r => r.isHeader);
  const bodyRows = rows.filter(r => !r.isHeader);

  const renderCell = (cell: Cell, rowIdx: number) => {
    if (cell.colSpan === 0) return '';
    const tag = cell.isHeader ? 'th' : 'td';
    const cs = cell.style;
    const padding = cs.padding ? `${cs.padding}px` : '8px';
    const styles = [
      `border:${border}`,
      `padding:${padding}`,
      `text-align:${cs.textAlign || 'left'}`,
      `font-weight:${cs.fontWeight || (cell.isHeader ? 'bold' : 'normal')}`,
      cs.fontSize ? `font-size:${cs.fontSize}px` : '',
      cs.bgColor ? `background:${cs.bgColor}` : '',
      cs.color ? `color:${cs.color}` : '',
    ].filter(Boolean).join(';');
    const colSpanAttr = cell.colSpan > 1 ? ` colspan="${cell.colSpan}"` : '';
    return `    <${tag}${colSpanAttr} style="${styles}">${cell.content}</${tag}>`;
  };

  const renderRow = (row: Row, rowIdx: number) => {
    const isZebra = ts.zebraStripe && !row.isHeader && rowIdx % 2 === 1;
    const rowBg = row.bgColor || (isZebra ? ts.zebraColor : '');
    const rowStyle = rowBg ? ` style="background:${rowBg}"` : '';
    const cells = row.cells.map((c, ci) => renderCell(c, ci)).filter(Boolean).join('\n');
    return `  <tr${rowStyle}>\n${cells}\n  </tr>`;
  };

  const stickyStyle = ts.stickyHeader ? ' style="position:sticky;top:0;z-index:1"' : '';
  const thead = headerRows.length > 0
    ? `<thead${stickyStyle}>\n${headerRows.map((r, i) => renderRow(r, i)).join('\n')}\n</thead>`
    : '';
  const tbody = bodyRows.length > 0
    ? `<tbody>\n${bodyRows.map((r, i) => renderRow(r, i)).join('\n')}\n</tbody>`
    : '';

  return `<table style="${tableStyle}">\n${thead}\n${tbody}\n</table>`;
}

function generateCSV(data: TableData): string {
  return data.rows
    .map(row =>
      row.cells
        .filter(c => c.colSpan !== 0)
        .map(c => `"${c.content.replace(/<[^>]+>/g, '').replace(/"/g, '""')}"`)
        .join(',')
    )
    .join('\n');
}

// ── Reducer ───────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_CELL'; rowIdx: number; colIdx: number; content: string }
  | { type: 'TOGGLE_CELL_HEADER'; rowIdx: number; colIdx: number }
  | { type: 'TOGGLE_ROW_HEADER'; rowIdx: number }
  | { type: 'SET_CELL_STYLE'; rowIdx: number; colIdx: number; style: Partial<CellStyle> }
  | { type: 'SET_ROW_BG'; rowIdx: number; color: string }
  | { type: 'SET_TABLE_STYLE'; style: Partial<TableStyles> }
  | { type: 'ADD_ROW'; after: number }
  | { type: 'REMOVE_ROW'; rowIdx: number }
  | { type: 'COPY_ROW'; rowIdx: number }
  | { type: 'ADD_COL'; after: number }
  | { type: 'REMOVE_COL'; colIdx: number }
  | { type: 'MOVE_COL'; from: number; to: number }
  | { type: 'MERGE_RIGHT'; rowIdx: number; colIdx: number }
  | { type: 'UNMERGE'; rowIdx: number; colIdx: number }
  | { type: 'IMPORT_CSV'; csv: string }
  | { type: 'UNDO' }
  | { type: 'REDO' };

interface UndoableState { present: TableData; past: TableData[]; future: TableData[] }
const MAX_HISTORY = 20;

function applyAction(state: TableData, action: Action): TableData {
  const cloneRows = () => state.rows.map(r => ({ ...r, cells: r.cells.map(c => ({ ...c, style: { ...c.style } })) }));

  switch (action.type) {
    case 'SET_CELL': {
      const rows = cloneRows();
      rows[action.rowIdx].cells[action.colIdx] = { ...rows[action.rowIdx].cells[action.colIdx], content: action.content };
      return { ...state, rows };
    }
    case 'TOGGLE_CELL_HEADER': {
      const rows = cloneRows();
      const cell = rows[action.rowIdx].cells[action.colIdx];
      rows[action.rowIdx].cells[action.colIdx] = { ...cell, isHeader: !cell.isHeader };
      return { ...state, rows };
    }
    case 'TOGGLE_ROW_HEADER': {
      const rows = cloneRows();
      const row = rows[action.rowIdx];
      const isHeader = !row.isHeader;
      rows[action.rowIdx] = { ...row, isHeader, cells: row.cells.map(c => ({ ...c, isHeader })) };
      return { ...state, rows };
    }
    case 'SET_CELL_STYLE': {
      const rows = cloneRows();
      const cell = rows[action.rowIdx].cells[action.colIdx];
      rows[action.rowIdx].cells[action.colIdx] = { ...cell, style: { ...cell.style, ...action.style } };
      return { ...state, rows };
    }
    case 'SET_ROW_BG': {
      const rows = cloneRows();
      rows[action.rowIdx] = { ...rows[action.rowIdx], bgColor: action.color };
      return { ...state, rows };
    }
    case 'SET_TABLE_STYLE':
      return { ...state, tableStyles: { ...state.tableStyles, ...action.style } };

    case 'ADD_ROW': {
      const rows = cloneRows();
      rows.splice(action.after + 1, 0, makeRow(rows[0]?.cells.length ?? 3));
      return { ...state, rows };
    }
    case 'REMOVE_ROW': {
      if (state.rows.length <= 1) return state;
      return { ...state, rows: cloneRows().filter((_, i) => i !== action.rowIdx) };
    }
    case 'COPY_ROW': {
      const rows = cloneRows();
      const copy = { ...rows[action.rowIdx], id: uid(), cells: rows[action.rowIdx].cells.map(c => ({ ...c, id: uid() })) };
      rows.splice(action.rowIdx + 1, 0, copy);
      return { ...state, rows };
    }
    case 'ADD_COL': {
      const rows = cloneRows().map(row => {
        const cells = [...row.cells];
        cells.splice(action.after + 1, 0, makeCell(row.isHeader));
        return { ...row, cells };
      });
      return { ...state, rows };
    }
    case 'REMOVE_COL': {
      if ((state.rows[0]?.cells.length ?? 0) <= 1) return state;
      const rows = cloneRows().map(row => ({ ...row, cells: row.cells.filter((_, ci) => ci !== action.colIdx) }));
      return { ...state, rows };
    }
    case 'MOVE_COL': {
      const { from, to } = action;
      if (from === to) return state;
      const rows = cloneRows().map(row => {
        const cells = [...row.cells];
        const [moved] = cells.splice(from, 1);
        cells.splice(to, 0, moved);
        return { ...row, cells };
      });
      return { ...state, rows };
    }
    case 'MERGE_RIGHT': {
      const { rowIdx, colIdx } = action;
      const rows = cloneRows();
      const cells = rows[rowIdx].cells;
      if (colIdx >= cells.length - 1 || cells[colIdx].colSpan === 0) return state;
      cells[colIdx] = { ...cells[colIdx], colSpan: (cells[colIdx].colSpan || 1) + 1 };
      cells[colIdx + 1] = { ...cells[colIdx + 1], colSpan: 0 };
      return { ...state, rows };
    }
    case 'UNMERGE': {
      const { rowIdx, colIdx } = action;
      const rows = cloneRows();
      const cells = rows[rowIdx].cells;
      const span = cells[colIdx].colSpan || 1;
      if (span <= 1) return state;
      cells[colIdx] = { ...cells[colIdx], colSpan: 1 };
      for (let i = 1; i < span; i++) {
        if (cells[colIdx + i]) cells[colIdx + i] = { ...cells[colIdx + i], colSpan: 1, content: '' };
      }
      return { ...state, rows };
    }
    case 'IMPORT_CSV': {
      const lines = action.csv.trim().split('\n').filter(Boolean);
      if (!lines.length) return state;
      const parsed = lines.map(l => l.split(',').map(v => v.replace(/^"|"$/g, '').trim()));
      const colCount = Math.max(...parsed.map(r => r.length));
      const rows: Row[] = parsed.map((cells, ri) => ({
        id: uid(), isHeader: ri === 0, bgColor: '',
        cells: Array.from({ length: colCount }, (_, ci) => ({
          id: uid(), content: cells[ci] || '', isHeader: ri === 0, colSpan: 1, style: {},
        })),
      }));
      return { ...state, rows };
    }
    default: return state;
  }
}

function reducer(state: UndoableState, action: Action): UndoableState {
  if (action.type === 'UNDO') {
    if (!state.past.length) return state;
    const past = [...state.past];
    const prev = past.pop()!;
    return { present: prev, past, future: [state.present, ...state.future] };
  }
  if (action.type === 'REDO') {
    if (!state.future.length) return state;
    const [next, ...future] = state.future;
    return { present: next, past: [...state.past, state.present].slice(-MAX_HISTORY), future };
  }
  const newPresent = applyAction(state.present, action);
  if (newPresent === state.present) return state;
  return { present: newPresent, past: [...state.past, state.present].slice(-MAX_HISTORY), future: [] };
}

// ── Sub-components ────────────────────────────────────────────────────────────

const PanelLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[9px] font-black uppercase tracking-widest text-white/35 mb-1">{children}</div>
);

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button type="button" onClick={() => onChange(!checked)}
    className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${checked ? 'bg-[#E61739]' : 'bg-white/10'}`}>
    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : ''}`} />
  </button>
);

// ── Main Component ────────────────────────────────────────────────────────────

export interface TableBuilderProps {
  value?: string;
  onChange: (json: string) => void;
}

export const TableBuilder = ({ value, onChange }: TableBuilderProps) => {
  const initialData = (() => { try { const d = JSON.parse(value || ''); return d.rows ? d : defaultTableData(); } catch { return defaultTableData(); } })();

  const [state, dispatch] = useReducer(reducer, { present: initialData, past: [], future: [] });
  const { present: data } = state;

  const [sel, setSel] = useState<{ r: number; c: number } | null>(null);
  const [editingCell, setEditingCell] = useState<{ r: number; c: number; draft: string } | null>(null);
  const [styleTab, setStyleTab] = useState<'table' | 'cell' | 'io'>('table');
  const [showPreview, setShowPreview] = useState(true);
  const [csvInput, setCsvInput] = useState('');
  const [dragCol, setDragCol] = useState<number | null>(null);
  const [dragOverCol, setDragOverCol] = useState<number | null>(null);
  const [copied, setCopied] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const colCount = data.rows[0]?.cells.length ?? 0;
  const selCell = sel ? data.rows[sel.r]?.cells[sel.c] : null;

  useEffect(() => { onChange(JSON.stringify(data)); }, [data]);

  useEffect(() => {
    if (editingCell && textareaRef.current) textareaRef.current.focus();
  }, [editingCell]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !editingCell) { e.preventDefault(); dispatch({ type: 'UNDO' }); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y' && !editingCell) { e.preventDefault(); dispatch({ type: 'REDO' }); }
      if (e.key === 'Escape' && editingCell) commitEdit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editingCell]);

  const d = (action: Action) => dispatch(action);

  const commitEdit = () => {
    if (!editingCell) return;
    d({ type: 'SET_CELL', rowIdx: editingCell.r, colIdx: editingCell.c, content: editingCell.draft });
    setEditingCell(null);
  };

  const setCellStyle = (style: Partial<CellStyle>) => {
    if (!sel) return;
    d({ type: 'SET_CELL_STYLE', rowIdx: sel.r, colIdx: sel.c, style });
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const downloadCSV = () => {
    const blob = new Blob([generateCSV(data)], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'table.csv'; a.click();
  };

  return (
    <div className="flex flex-col gap-3 text-white text-sm select-none">

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <button type="button" onClick={() => d({ type: 'UNDO' })} disabled={!state.past.length}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-25 text-xs font-bold transition-colors">
          <RotateCcw size={11} /> Undo
        </button>
        <button type="button" onClick={() => d({ type: 'REDO' })} disabled={!state.future.length}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-25 text-xs font-bold transition-colors">
          <RotateCw size={11} /> Redo
        </button>
        <div className="h-3.5 w-px bg-white/10" />
        <button type="button" onClick={() => setShowPreview(p => !p)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold transition-colors">
          {showPreview ? <EyeOff size={11} /> : <Eye size={11} />}
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
        <span className="ml-auto text-[9px] text-white/20 font-mono">{state.past.length}/{MAX_HISTORY} steps · double-click to edit</span>
      </div>

      {/* ── Builder (grid + panel) ── */}
      <div className="flex gap-3 items-start">

        {/* Grid */}
        <div className="flex-1 min-w-0 overflow-x-auto">
          <div className="min-w-[360px] space-y-px">

            {/* Column headers */}
            <div className="flex gap-px mb-1" style={{ paddingLeft: 80 }}>
              {Array.from({ length: colCount }, (_, ci) => (
                <div key={ci}
                  draggable
                  onDragStart={() => setDragCol(ci)}
                  onDragOver={e => { e.preventDefault(); setDragOverCol(ci); }}
                  onDragEnd={() => {
                    if (dragCol !== null && dragOverCol !== null && dragCol !== dragOverCol)
                      d({ type: 'MOVE_COL', from: dragCol, to: dragOverCol });
                    setDragCol(null); setDragOverCol(null);
                  }}
                  className={`flex-1 min-w-0 flex items-center justify-between gap-1 px-2 py-1 rounded text-[9px] font-bold cursor-grab transition-colors ${dragOverCol === ci ? 'bg-[#E61739]/20 border border-[#E61739]/40' : 'bg-white/5 text-white/30 hover:text-white/60'}`}>
                  <span className="flex items-center gap-1"><GripVertical size={9} />C{ci + 1}</span>
                  <button type="button" onClick={() => d({ type: 'REMOVE_COL', colIdx: ci })}
                    className="text-white/15 hover:text-red-400 transition-colors leading-none">×</button>
                </div>
              ))}
              <button type="button" onClick={() => d({ type: 'ADD_COL', after: colCount - 1 })}
                className="px-2 py-1 rounded bg-[#E61739]/10 text-[#E61739] hover:bg-[#E61739]/20 text-[10px] font-bold transition-colors shrink-0 ml-1">
                +Col
              </button>
            </div>

            {/* Rows */}
            {data.rows.map((row, ri) => (
              <div key={row.id} className="flex items-stretch gap-px group/row">

                {/* Row controls */}
                <div className="w-20 shrink-0 flex items-center gap-0.5 pr-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                  <button type="button" onClick={() => d({ type: 'TOGGLE_ROW_HEADER', rowIdx: ri })}
                    title={row.isHeader ? 'Unset header' : 'Set as header'}
                    className={`px-1 py-0.5 rounded text-[8px] font-black uppercase transition-colors ${row.isHeader ? 'bg-[#E61739] text-white' : 'bg-white/5 text-white/30 hover:text-white'}`}>
                    {row.isHeader ? 'HDR' : 'hdr'}
                  </button>
                  <button type="button" onClick={() => d({ type: 'COPY_ROW', rowIdx: ri })} title="Copy row"
                    className="p-0.5 rounded text-white/20 hover:text-white/60 transition-colors"><Copy size={10} /></button>
                  <button type="button" onClick={() => d({ type: 'REMOVE_ROW', rowIdx: ri })} title="Remove row"
                    className="p-0.5 rounded text-white/20 hover:text-red-400 transition-colors"><Trash2 size={10} /></button>
                </div>

                {/* Cells */}
                {row.cells.map((cell, ci) => {
                  if (cell.colSpan === 0) return null;
                  const isSelected = sel?.r === ri && sel?.c === ci;
                  const isEditing = editingCell?.r === ri && editingCell?.c === ci;
                  const cellBg = cell.style.bgColor || row.bgColor || (row.isHeader ? '#1e293b' : '');
                  return (
                    <div key={cell.id}
                      style={{ flex: cell.colSpan > 1 ? cell.colSpan : 1, background: cellBg || undefined }}
                      onClick={() => { setSel({ r: ri, c: ci }); setStyleTab('cell'); }}
                      onDoubleClick={() => { setSel({ r: ri, c: ci }); setEditingCell({ r: ri, c: ci, draft: cell.content }); }}
                      className={`min-w-0 relative border rounded transition-all cursor-pointer min-h-[34px] ${
                        isSelected ? 'border-[#E61739] shadow-[0_0_0_1.5px_#E61739]' : row.isHeader ? 'border-white/10 bg-[#1e293b]/70' : 'border-white/5 bg-black/20 hover:border-white/20'
                      }`}>

                      {isEditing ? (
                        <textarea
                          ref={textareaRef}
                          value={editingCell.draft}
                          onChange={e => setEditingCell(prev => prev ? { ...prev, draft: e.target.value } : null)}
                          onBlur={commitEdit}
                          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commitEdit(); } }}
                          rows={2}
                          className="w-full h-full bg-transparent px-2 py-1.5 text-xs text-white outline-none resize-none"
                          style={{ textAlign: cell.style.textAlign || 'left', fontWeight: cell.style.fontWeight || (row.isHeader ? 'bold' : 'normal') }}
                        />
                      ) : (
                        <div className={`px-2 py-1.5 text-xs ${row.isHeader ? 'font-bold text-white' : 'text-white/70'} ${!cell.content ? 'text-white/15 italic' : ''}`}
                          style={{ textAlign: cell.style.textAlign || 'left', fontWeight: cell.style.fontWeight || (row.isHeader ? 'bold' : 'normal'), fontSize: cell.style.fontSize ? `${cell.style.fontSize}px` : undefined, color: cell.style.color || undefined }}>
                          {cell.content || 'double-click…'}
                        </div>
                      )}

                      {cell.colSpan > 1 && (
                        <span className="absolute top-0.5 right-1 text-[7px] font-black text-[#E61739]/50">⊞{cell.colSpan}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Add row */}
            <div style={{ paddingLeft: 80 }} className="pt-1">
              <button type="button" onClick={() => d({ type: 'ADD_ROW', after: data.rows.length - 1 })}
                className="w-full py-1.5 rounded border border-dashed border-white/10 text-white/25 hover:text-white hover:border-white/30 text-xs font-bold transition-colors flex items-center justify-center gap-1">
                <Plus size={11} /> Add Row
              </button>
            </div>
          </div>
        </div>

        {/* Style panel */}
        <div className="w-60 shrink-0 bg-[#0e0e0e] border border-white/10 rounded-xl overflow-hidden">
          <div className="flex border-b border-white/8">
            {(['table', 'cell', 'io'] as const).map(tab => (
              <button key={tab} type="button" onClick={() => setStyleTab(tab)}
                className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest transition-colors ${styleTab === tab ? 'bg-white/5 text-white border-b-2 border-[#E61739]' : 'text-white/25 hover:text-white'}`}>
                {tab === 'io' ? 'Import/Export' : tab}
              </button>
            ))}
          </div>

          <div className="p-3 space-y-3 overflow-y-auto" style={{ maxHeight: 460 }}>

            {/* TABLE tab */}
            {styleTab === 'table' && (
              <>
                <div>
                  <PanelLabel>Width</PanelLabel>
                  <div className="grid grid-cols-4 gap-0.5">
                    {['100%', 'auto', '800px', '600px'].map(w => (
                      <button key={w} type="button" onClick={() => d({ type: 'SET_TABLE_STYLE', style: { width: w } })}
                        className={`py-1 rounded text-[9px] font-bold transition-colors ${data.tableStyles.width === w ? 'bg-[#E61739] text-white' : 'bg-white/5 text-white/35 hover:text-white'}`}>
                        {w}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <PanelLabel>Font Size (px)</PanelLabel>
                  <input type="number" min="10" max="24" value={data.tableStyles.fontSize}
                    onChange={e => d({ type: 'SET_TABLE_STYLE', style: { fontSize: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-[#E61739] focus:outline-none" />
                </div>

                <div>
                  <PanelLabel>Border Style</PanelLabel>
                  <div className="flex gap-1">
                    <select value={data.tableStyles.borderStyle}
                      onChange={e => d({ type: 'SET_TABLE_STYLE', style: { borderStyle: e.target.value as any } })}
                      className="flex-1 bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-[#E61739] focus:outline-none">
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                      <option value="none">None</option>
                    </select>
                    <input type="number" min="0" max="5" value={data.tableStyles.borderWidth}
                      onChange={e => d({ type: 'SET_TABLE_STYLE', style: { borderWidth: e.target.value } })}
                      className="w-12 bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-[#E61739] focus:outline-none" />
                    <input type="color" value={data.tableStyles.borderColor}
                      onChange={e => d({ type: 'SET_TABLE_STYLE', style: { borderColor: e.target.value } })}
                      className="w-8 h-7 rounded border-0 cursor-pointer bg-transparent" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <PanelLabel>Zebra Stripe</PanelLabel>
                  <Toggle checked={data.tableStyles.zebraStripe} onChange={v => d({ type: 'SET_TABLE_STYLE', style: { zebraStripe: v } })} />
                </div>
                {data.tableStyles.zebraStripe && (
                  <div className="flex items-center gap-2 -mt-1">
                    <PanelLabel>Stripe Color</PanelLabel>
                    <input type="color" value={data.tableStyles.zebraColor}
                      onChange={e => d({ type: 'SET_TABLE_STYLE', style: { zebraColor: e.target.value } })}
                      className="w-8 h-6 rounded border-0 cursor-pointer bg-transparent" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <PanelLabel>Sticky Header</PanelLabel>
                  <Toggle checked={data.tableStyles.stickyHeader} onChange={v => d({ type: 'SET_TABLE_STYLE', style: { stickyHeader: v } })} />
                </div>
              </>
            )}

            {/* CELL tab */}
            {styleTab === 'cell' && (
              !sel ? (
                <p className="text-white/25 text-xs text-center py-6">Click a cell to style it</p>
              ) : (
                <>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#E61739]/70 mb-0.5">
                    Row {sel.r + 1} · Col {sel.c + 1}
                    {selCell?.colSpan && selCell.colSpan > 1 ? ` · merged ×${selCell.colSpan}` : ''}
                  </div>

                  <div>
                    <PanelLabel>Align</PanelLabel>
                    <div className="flex gap-1">
                      {(['left', 'center', 'right'] as const).map(a => (
                        <button key={a} type="button" onClick={() => setCellStyle({ textAlign: a })}
                          className={`flex-1 py-1.5 rounded flex items-center justify-center transition-colors ${(selCell?.style.textAlign || 'left') === a ? 'bg-[#E61739] text-white' : 'bg-white/5 text-white/30 hover:text-white'}`}>
                          {a === 'left' ? <AlignLeft size={11} /> : a === 'center' ? <AlignCenter size={11} /> : <AlignRight size={11} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <PanelLabel>Bold</PanelLabel>
                    <Toggle checked={selCell?.style.fontWeight === 'bold'} onChange={v => setCellStyle({ fontWeight: v ? 'bold' : 'normal' })} />
                  </div>

                  <div>
                    <PanelLabel>Font Size (px)</PanelLabel>
                    <input type="number" min="10" max="32" value={selCell?.style.fontSize || ''}
                      placeholder={`${data.tableStyles.fontSize} (default)`}
                      onChange={e => setCellStyle({ fontSize: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-[#E61739] focus:outline-none" />
                  </div>

                  <div>
                    <PanelLabel>Cell Padding (px)</PanelLabel>
                    <input type="number" min="0" max="32" value={selCell?.style.padding || '8'}
                      onChange={e => setCellStyle({ padding: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-[#E61739] focus:outline-none" />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1"><PanelLabel>Text Color</PanelLabel></div>
                    <input type="color" value={selCell?.style.color || '#ffffff'}
                      onChange={e => setCellStyle({ color: e.target.value })}
                      className="w-8 h-6 rounded border-0 cursor-pointer bg-transparent" />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1"><PanelLabel>Cell Background</PanelLabel></div>
                    <input type="color" value={selCell?.style.bgColor || '#000000'}
                      onChange={e => setCellStyle({ bgColor: e.target.value })}
                      className="w-8 h-6 rounded border-0 cursor-pointer bg-transparent" />
                    {selCell?.style.bgColor && (
                      <button type="button" onClick={() => setCellStyle({ bgColor: '' })} className="text-[9px] text-white/25 hover:text-white">clear</button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1"><PanelLabel>Row Background</PanelLabel></div>
                    <input type="color" value={data.rows[sel.r]?.bgColor || '#000000'}
                      onChange={e => d({ type: 'SET_ROW_BG', rowIdx: sel.r, color: e.target.value })}
                      className="w-8 h-6 rounded border-0 cursor-pointer bg-transparent" />
                    {data.rows[sel.r]?.bgColor && (
                      <button type="button" onClick={() => d({ type: 'SET_ROW_BG', rowIdx: sel.r, color: '' })} className="text-[9px] text-white/25 hover:text-white">clear</button>
                    )}
                  </div>

                  <div className="border-t border-white/8 pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <PanelLabel>Header Cell</PanelLabel>
                      <Toggle checked={!!selCell?.isHeader}
                        onChange={() => d({ type: 'TOGGLE_CELL_HEADER', rowIdx: sel.r, colIdx: sel.c })} />
                    </div>
                  </div>

                  <div className="border-t border-white/8 pt-2 space-y-1">
                    <PanelLabel>Merge</PanelLabel>
                    <div className="flex gap-1">
                      <button type="button" onClick={() => d({ type: 'MERGE_RIGHT', rowIdx: sel.r, colIdx: sel.c })}
                        className="flex-1 py-1 rounded text-[9px] font-bold bg-white/5 text-white/35 hover:text-white hover:bg-white/10 transition-colors">
                        → Merge Right
                      </button>
                      <button type="button" onClick={() => d({ type: 'UNMERGE', rowIdx: sel.r, colIdx: sel.c })}
                        className="flex-1 py-1 rounded text-[9px] font-bold bg-white/5 text-white/35 hover:text-white hover:bg-white/10 transition-colors">
                        ⊠ Split
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-white/8 pt-2 space-y-1">
                    <PanelLabel>Insert</PanelLabel>
                    <button type="button" onClick={() => d({ type: 'ADD_ROW', after: sel.r })}
                      className="w-full py-1.5 rounded bg-white/5 text-white/35 hover:text-white hover:bg-white/10 text-[10px] font-bold transition-colors">
                      + Row Below
                    </button>
                    <button type="button" onClick={() => d({ type: 'ADD_COL', after: sel.c })}
                      className="w-full py-1.5 rounded bg-white/5 text-white/35 hover:text-white hover:bg-white/10 text-[10px] font-bold transition-colors">
                      + Column Right
                    </button>
                  </div>
                </>
              )
            )}

            {/* I/O tab */}
            {styleTab === 'io' && (
              <>
                <PanelLabel>Import CSV</PanelLabel>
                <p className="text-[9px] text-white/30 leading-relaxed">Paste CSV data — first row becomes the header.</p>
                <textarea value={csvInput} onChange={e => setCsvInput(e.target.value)}
                  placeholder={'Name,Age,Role\nJohn,30,Engineer\nJane,28,Designer'}
                  className="w-full h-20 bg-black/40 border border-white/10 rounded px-2 py-1.5 text-[10px] text-white font-mono focus:border-[#E61739] focus:outline-none resize-none" />
                <button type="button" onClick={() => { d({ type: 'IMPORT_CSV', csv: csvInput }); setCsvInput(''); }}
                  className="w-full py-1.5 rounded bg-[#E61739] text-white text-xs font-bold hover:bg-[#c51431] transition-colors flex items-center justify-center gap-1">
                  <Upload size={11} /> Import
                </button>

                <div className="border-t border-white/8 pt-3 space-y-1.5">
                  <PanelLabel>Export</PanelLabel>
                  <button type="button" onClick={() => copyText(generateTableHTML(data), 'html')}
                    className="w-full py-1.5 rounded bg-white/5 text-white/50 hover:text-white hover:bg-white/10 text-xs font-bold transition-colors">
                    {copied === 'html' ? '✓ Copied!' : '⟨/⟩ Copy HTML'}
                  </button>
                  <button type="button" onClick={() => copyText(generateCSV(data), 'csv')}
                    className="w-full py-1.5 rounded bg-white/5 text-white/50 hover:text-white hover:bg-white/10 text-xs font-bold transition-colors">
                    {copied === 'csv' ? '✓ Copied!' : '📋 Copy CSV'}
                  </button>
                  <button type="button" onClick={downloadCSV}
                    className="w-full py-1.5 rounded bg-white/5 text-white/50 hover:text-white hover:bg-white/10 text-xs font-bold transition-colors flex items-center justify-center gap-1">
                    <Download size={11} /> Download .csv
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Live Preview */}
      {showPreview && (
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <div className="bg-white/5 border-b border-white/8 px-4 py-2 flex items-center gap-2">
            <Eye size={11} className="text-white/30" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Live Preview</span>
          </div>
          <div className="bg-white p-4 overflow-x-auto">
            <style>{`
              .tbl-preview table { border-collapse: collapse; }
              .tbl-preview th, .tbl-preview td { font-family: sans-serif; }
            `}</style>
            <div className="tbl-preview" dangerouslySetInnerHTML={{ __html: generateTableHTML(data) }} />
          </div>
        </div>
      )}
    </div>
  );
};
