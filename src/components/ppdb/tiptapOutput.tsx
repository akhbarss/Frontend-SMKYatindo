import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

const TiptapOutput = ({
  desc,
  style,
}: {
  desc: string;
  style?: React.CSSProperties;
}) => {
  
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
    editable: false,
  });

  editorInput?.commands.setContent(desc)

  return (
    <RichTextEditor editor={editorInput} style={{ border: "none" }}>
      <RichTextEditor.Content
        sx={{ backgroundColor: "inherit" }}
        style={style}
      />
    </RichTextEditor>
  );
};

export default TiptapOutput;
