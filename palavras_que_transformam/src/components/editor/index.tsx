import React, { useEffect, useRef, useState } from 'react';
import { ContentState, convertFromHTML, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { configToolbar } from './config.toolbar';
import { useTheme } from '@mui/material';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import wordCounter from '../../store/application/utils/word.counter';

// Definindo a interface para os props
interface EditorProps {
    readonly value: string;
    onChange(value: string): void;
    setWordsCount(value: number): void
}

const TextEditor: React.FC<EditorProps> = ({ onChange, value, setWordsCount }) => {
    const theme = useTheme();
    
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

    useEffect(() => {
        if (value && !editorState.getCurrentContent().hasText()) {
            const blocksFromHtml = htmlToDraft(value);
            if (blocksFromHtml) {
                const { contentBlocks, entityMap } = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                setEditorState(EditorState.createWithContent(contentState));
            }
        }
    }, [value]);


    const onEditorStateChange = (newState: EditorState) => {

        // Atualiza o editor
        setEditorState(newState);


        // Obter o texto puro do editor
        const plainText = newState.getCurrentContent().getPlainText();

        // Contar as palavras
        const words = wordCounter(plainText);
        setWordsCount(words);

        // Converter o conteúdo para HTML e passar para o `onChange` e variaveo body
        const contentHTML = draftToHtml(convertToRaw(newState.getCurrentContent()));
        
        if (contentHTML !== value) {
            onChange(contentHTML);
          }
    };

    // Ref para o editor (para manipulação de rolagem, se necessário)
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.scrollTop = editorRef.current.scrollHeight;
        }
    }, [editorState]);

    return (
        <div ref={editorRef}>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorStyle={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    minHeight: "200px",
                    maxHeight: "300px",
                    overflowY: "auto",
                    "&:focus": {
                        borderColor: theme.palette.primary.main,
                    },
                }}
                onEditorStateChange={onEditorStateChange}
                toolbar={configToolbar()}
                localization={{
                    locale: 'pt',
                }}
            />
        </div>
    );
};

export default TextEditor;
