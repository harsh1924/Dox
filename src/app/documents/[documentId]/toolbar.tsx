/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { cn } from "@/lib/utils";

import { useEditorStore } from "@/store/use-editor-store";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { BoldIcon, ChevronDownIcon, HighlighterIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";

import { type Level } from '@tiptap/extension-heading';
import { SketchPicker, type ColorResult } from 'react-color';

// Time Stamp: 02:34:00

const HighlightColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes('highlight').color || '#ffffff';
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run()
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='flex flex-col justify-center items-center hover:bg-neutral-200/80 px-1.5 rounded-sm min-w-7 h-7 text-sm overflow-hidden shrink-0'>
                    <HighlighterIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 border">
                <SketchPicker color={value} onChange={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const TextColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes('textStyle').color || '#000000';
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run()
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='flex flex-col justify-center items-center hover:bg-neutral-200/80 px-1.5 rounded-sm min-w-7 h-7 text-sm overflow-hidden shrink-0'>
                    <span className="text-xs">
                        B
                    </span>
                    <div className="w-full h-0.5" style={{ backgroundColor: value }} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 border">
                <SketchPicker color={value} onChange={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HeadingLevelButton = () => {
    const { editor } = useEditorStore();

    const headings = [
        { label: 'Normal', value: 0, fontSize: '16px' },
        { label: 'Heading 1', value: 1, fontSize: '32px' },
        { label: 'Heading 2', value: 2, fontSize: '24px' },
        { label: 'Heading 3', value: 3, fontSize: '20px' },
        { label: 'Heading 4', value: 4, fontSize: '18px' },
        { label: 'Heading 5', value: 5, fontSize: '16px' },
    ];

    const getCurrentHeading = () => {
        for (let level = 1; level < 6; level++) {
            if (editor?.isActive('heading', { level })) {
                return `Heading ${level}`
            }
        }

        return 'Normal';
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='flex justify-center items-center hover:bg-neutral-200/80 px-1.5 rounded-sm min-w-7 h-7 text-sm overflow-hidden shrink-0'>
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className="ml-2 shrink-0 size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
                {headings.map(({ label, value, fontSize }) => (
                    <button
                        key={value}
                        style={{ fontSize }}
                        className={cn(
                            'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                            (value === 0 && !editor?.isActive('heading')) || editor?.isActive('heading', { level: value }) && 'bg-neutral-200/80'
                        )}
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run();
                            } else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run();
                            }
                        }}
                    >
                        <span>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const FontFamilyButton = () => {
    const { editor } = useEditorStore();

    const fonts = [
        { label: 'Arial', value: 'Arial' },
        { label: 'Times New Roman', value: 'Times New Roman' },
        { label: 'Courier New', value: 'Courier New' },
        { label: 'Georgia', value: 'Georgia' },
        { label: 'Verdana', value: 'Verdana' },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='flex justify-between items-center hover:bg-neutral-200/80 px-1.5 rounded-sm w-[120px] h-7 text-sm overflow-hidden shrink-0'>
                    <span className="truncate">
                        {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
                    </span>
                    <ChevronDownIcon className="ml-2 shrink-0 size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
                {fonts.map(({ label, value }) => (
                    <button key={value} onClick={() => editor?.chain().focus().setFontFamily(value).run()} className={cn(
                        'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                        editor?.getAttributes('textStyle').fontFamily === value && 'bg-neutral-200/80'
                    )} style={{ fontFamily: value }}>
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
};

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon
}: ToolbarButtonProps) => {
    return (
        <button onClick={onClick} className={cn(
            'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
            isActive && 'bg-neutral-200/80'
        )}>
            <Icon className="size-4" />
        </button>
    )
}

export const Toolbar = () => {

    const { editor } = useEditorStore();

    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            // First Array
            [
                {
                    label: 'Undo',
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                },
                {
                    label: 'Redo',
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),
                },
                {
                    label: 'Print',
                    icon: PrinterIcon,
                    onClick: () => window.print(),
                },
                {
                    label: 'Spell Check',
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                    }
                },
            ],
            // Second Array
            [
                {
                    label: 'Bold',
                    icon: BoldIcon,
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                    isActive: editor?.isActive("bold")
                },
                {
                    label: 'Italic',
                    icon: ItalicIcon,
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                    isActive: editor?.isActive("italic")
                },
                {
                    label: 'Underline',
                    icon: UnderlineIcon,
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                    isActive: editor?.isActive("underline")
                },
            ],
            // Third Array
            [
                {
                    label: 'Comment',
                    icon: MessageSquarePlusIcon,
                    onClick: () => console.log('TODO'),
                    isActive: false
                },
                {
                    label: 'List Todo',
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: editor?.isActive('taskList')
                },
                {
                    label: 'Remove Formatting',
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                },
            ]
        ];

    return (
        <div className="flex items-center gap-x-0.5 bg-[#F1F4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] overflow-x-auto">
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <Separator orientation="vertical" className="bg-neutral-300 h-6" />

            <FontFamilyButton />
            <Separator orientation="vertical" className="bg-neutral-300 h-6" />

            <HeadingLevelButton />
            <Separator orientation="vertical" className="bg-neutral-300 h-6" />

            {/* TODO: Font Size */}
            <Separator orientation="vertical" className="bg-neutral-300 h-6" />

            {sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <TextColorButton />
            <HighlightColorButton />
            <Separator orientation="vertical" className="bg-neutral-300 h-6" />
            
            {/* todo link */}
            {/* todo image */}
            {/* todo align */}
            {/* todo line height */}
            {/* todo list */}
            {sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
        </div>
    )
}