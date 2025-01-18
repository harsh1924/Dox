/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useStorage } from '@liveblocks/react';
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Color } from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table'
import TaskItem from '@tiptap/extension-task-item';
import { useEditor, EditorContent } from '@tiptap/react';
import { useEditorStore } from '@/store/use-editor-store';

import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import ImageResize from 'tiptap-extension-resize-image';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';


import { FontSizeExtension } from '@/extensions/font-size';
import { LineHeightExtension } from '@/extensions/line-height';
import { Ruler } from './ruler';

import { Threads } from './threads';

export const EditorPage = () => {
  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);

  const liveblocks = useLiveblocksExtension();
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    extensions: [
      liveblocks,
      FontSizeExtension,
      Color,
      FontFamily,
      TextStyle,
      Underline,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Image,
      ImageResize,
      TaskList,
      LineHeightExtension,
      StarterKit.configure({
        history: false
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Highlight.configure({
        multicolor: true
      }),
      TaskItem.configure({
        nested: true
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https'
      }),
    ],
    content: `
            Hi There!
          `,
    editorProps: {
      attributes: {
        class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
        style: `padding-left: ${leftMargin ?? 56}px; padding-right: ${rightMargin ?? 56}px`
      }
    }
  });

  return (
    <div className="bg-[#F9FBFD] print:bg-white px-4 print:p-0 print:overflow-visible overflow-x-auto size-full">
      <Ruler />
      <div className="flex justify-center mx-auto py-4 print:py-0 w-[816px] print:w-full min-w-max print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
}