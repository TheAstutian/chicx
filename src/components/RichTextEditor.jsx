import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '<p>Start typing your product description...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Sends the HTML back to your parent component
    },
  })

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Menu Bar */}
      <div className="bg-gray-100 p-2 border-b border-gray-300 flex gap-2 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 text-sm rounded ${editor.isActive('bold') ? 'bg-secondary text-white' : 'bg-white border'}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 text-sm rounded ${editor.isActive('italic') ? 'bg-secondary text-white' : 'bg-white border'}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 text-sm rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-secondary text-white' : 'bg-white border'}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 text-sm rounded ${editor.isActive('bulletList') ? 'bg-secondary text-white' : 'bg-white border'}`}
        >
          Bullet List
        </button>
      </div>

      {/* The actual editable area */}
      <div className="p-4 min-h-[150px] focus:outline-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default RichTextEditor;