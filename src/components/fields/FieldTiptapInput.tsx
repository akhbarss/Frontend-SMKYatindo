import { Text } from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaHighlighter,
  FaItalic,
  FaListOl,
  FaListUl,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";
import { GrBlockQuote } from "react-icons/gr";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuMoreHorizontal,
} from "react-icons/lu";
import { TbClearFormatting } from "react-icons/tb";

const BoldIcon = () => <FaBold size={12} />;
const ItalicIcon = () => <FaItalic size={12} />;
const UnderlineIcon = () => <FaUnderline size={12} />;
const StrikethroughIcon = () => <FaStrikethrough size={12} />;
const ClearFormattingIcon = () => <TbClearFormatting size={12} />;
const HighlightIcon = () => <FaHighlighter size={12} />;
const Heading1Icon = () => <LuHeading1 size={12} />;
const Heading2Icon = () => <LuHeading2 size={12} />;
const Heading3Icon = () => <LuHeading3 size={12} />;
const Heading4Icon = () => <LuHeading4 size={12} />;
const BlockquoteIcon = () => <GrBlockQuote size={12} />;
const HorizontalLineIcon = () => <LuMoreHorizontal size={12} />;
const BulletListIcon = () => <FaListUl size={12} />;
const OrderedListIcon = () => <FaListOl size={12} />;
const AlignLeftIcon = () => <FaAlignLeft size={12} />;
const AlignRightIcon = () => <FaAlignRight size={12} />;
const AlignCenterIcon = () => <FaAlignCenter size={12} />;
const AlignJustifyIcon = () => <FaAlignJustify size={12} />;

const TiptapInput = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) => {
  const padding = { padding: "0.6rem 0.3rem" };

  const editorInput = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  return (
    <>
    <RichTextEditor editor={editorInput} style={{ borderColor: error ? "red" : undefined }}>
      <RichTextEditor.Toolbar sticky stickyOffset={0}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold icon={BoldIcon} style={padding} />
          <RichTextEditor.Italic icon={ItalicIcon} style={padding} />
          <RichTextEditor.Underline icon={UnderlineIcon} style={padding} />
          <RichTextEditor.Strikethrough
            icon={StrikethroughIcon}
            style={padding}
          />
          <RichTextEditor.ClearFormatting
            icon={ClearFormattingIcon}
            style={padding}
          />
          <RichTextEditor.Highlight icon={HighlightIcon} style={padding} />
          {/* <RichTextEditor.Code /> style={padding}*/}
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 icon={Heading1Icon} style={padding} />
          <RichTextEditor.H2 icon={Heading2Icon} style={padding} />
          <RichTextEditor.H3 icon={Heading3Icon} style={padding} />
          <RichTextEditor.H4 icon={Heading4Icon} style={padding} />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote icon={BlockquoteIcon} style={padding} />
          <RichTextEditor.Hr icon={HorizontalLineIcon} style={padding} />
          <RichTextEditor.BulletList icon={BulletListIcon} style={padding} />
          <RichTextEditor.OrderedList icon={OrderedListIcon} style={padding} />
          {/* <RichTextEditor.Subscript style={padding}/>
                    <RichTextEditor.Superscript  icon={} /> style={padding}*/}
        </RichTextEditor.ControlsGroup>

        {/* <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link  icon={} style={padding}/>
                    <RichTextEditor.Unlink  icon={} style={padding}/>
                </RichTextEditor.ControlsGroup> */}

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft icon={AlignLeftIcon} style={padding} />
          <RichTextEditor.AlignCenter icon={AlignCenterIcon} style={padding} />
          <RichTextEditor.AlignJustify
            icon={AlignJustifyIcon}
            style={padding}
          />
          <RichTextEditor.AlignRight icon={AlignRightIcon} style={padding} />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
    <Text c={"red"} fz={"xs"}>{error}</Text>
    </>
  );
};

export default TiptapInput;
