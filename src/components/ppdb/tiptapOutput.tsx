import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaStrikethrough,
    FaHighlighter,
    FaCode,
    FaListUl,
    FaListOl,
    FaAlignCenter,
    FaAlignJustify,
    FaAlignLeft,
    FaAlignRight
} from "react-icons/fa"
import {
    LuHeading1,
    LuHeading2,
    LuHeading3,
    LuHeading4,
    LuMoreHorizontal,

} from "react-icons/lu"
import { TbClearFormatting } from "react-icons/tb"
import { GrBlockQuote } from "react-icons/gr"

const BoldIcon = () => <FaBold size={12} />
const ItalicIcon = () => <FaItalic size={12} />
const UnderlineIcon = () => <FaUnderline size={12} />
const StrikethroughIcon = () => <FaStrikethrough size={12} />
const ClearFormattingIcon = () => <TbClearFormatting size={12} />
const HighlightIcon = () => <FaHighlighter size={12} />
const Heading1Icon = () => <LuHeading1 size={12} />
const Heading2Icon = () => <LuHeading2 size={12} />
const Heading3Icon = () => <LuHeading3 size={12} />
const Heading4Icon = () => <LuHeading4 size={12} />
const BlockquoteIcon = () => <GrBlockQuote size={12} />
const HorizontalLineIcon = () => <LuMoreHorizontal size={12} />
const BulletListIcon = () => <FaListUl size={12} />
const OrderedListIcon = () => <FaListOl size={12} />
const AlignLeftIcon = () => <FaAlignLeft size={12} />
const AlignRightIcon = () => <FaAlignRight size={12} />
const AlignCenterIcon = () => <FaAlignCenter size={12} />
const AlignJustifyIcon = () => <FaAlignJustify size={12} />

const TiptapOutput = ({
    desc,
    style
}: {
    desc: string
    style?: React.CSSProperties
}) => {

    const editorInput = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: desc,
        editable: false
    });

    return (
        <RichTextEditor
            editor={editorInput}
            style={{ border: "none" }}
        >
            <RichTextEditor.Content />
        </RichTextEditor>
    )
}

export default TiptapOutput