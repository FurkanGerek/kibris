import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface TailwindQuillEditorProps {
    value?: string; // Controlled içerik
    onChange?: (content: string) => void; // HTML formatında döner
}

export interface TailwindQuillEditorRef {
    clear: () => void; // Editörü temizleme
}

const TailwindQuillEditor = forwardRef<TailwindQuillEditorRef, TailwindQuillEditorProps>(
    ({ value, onChange }, ref) => {
        const editorRef = useRef<HTMLDivElement | null>(null);
        const toolbarRef = useRef<HTMLDivElement | null>(null);
        const quillRef = useRef<Quill | null>(null);

        // Ref ile dışa expose edilen fonksiyonlar
        useImperativeHandle(ref, () => ({
            clear: () => quillRef.current?.setContents([]),
        }));

        // Quill Editor kurulumu
        useEffect(() => {
            if (editorRef.current && toolbarRef.current && !quillRef.current) {
                const quill = new Quill(editorRef.current, {
                    theme: "snow",
                    modules: {
                        toolbar: toolbarRef.current,
                    },
                    placeholder: "Bir şeyler yaz...",
                });

                quill.on("text-change", () => {
                    onChange?.(quill.root.innerHTML);
                });

                quillRef.current = quill;
            }
        }, [onChange]);

        // Controlled value güncelleme
        useEffect(() => {
            if (quillRef.current && value !== undefined && value !== quillRef.current.root.innerHTML) {
                quillRef.current.root.innerHTML = value;
            }
        }, [value]);

        return (
            <div className="w-full rounded-xl border border-gray-300 overflow-hidden">
                {/* Toolbar */}
                <div ref={toolbarRef} className="ql-toolbar bg-white border-b border-gray-200 p-2">
                    <span className="ql-formats">
                        <select className="ql-header" defaultValue="">
                            <option value="1"></option>
                            <option value="2"></option>
                            <option value=""></option>
                        </select>
                        <button className="ql-bold"></button>
                        <button className="ql-italic"></button>
                        <button className="ql-underline"></button>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-list" value="ordered"></button>
                        <button className="ql-list" value="bullet"></button>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-link"></button>
                        <button className="ql-image"></button>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-clean"></button>
                    </span>
                </div>

                {/* Editor */}
                <div
                    ref={editorRef}
                    className="ql-container h-64 bg-gray-50 text-gray-800 p-4"
                ></div>
            </div>
        );
    }
);

export default TailwindQuillEditor;
