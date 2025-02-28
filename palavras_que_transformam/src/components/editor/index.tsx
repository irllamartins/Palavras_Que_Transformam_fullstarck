import React, { useEffect, useRef, useState } from 'react';
import { ContentState, convertFromHTML, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { ConfigToolbar } from './config.toolbar';
import { Box, useTheme } from '@mui/material';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import wordCounter from '../../store/application/utils/word.counter';
import zIndex from '@mui/material/styles/zIndex';
import { Theme } from '../theme/context';

// Definindo a interface para os props
interface EditorProps {
    readonly value: string;
    onChange(value: string): void;
    setWordsCount(value: number): void
}

const TextEditor: React.FC<EditorProps> = ({ onChange, value, setWordsCount }) => {
    const theme = useTheme();
    const colorFont = theme.palette.getContrastText(theme.palette.background.paper)
    const backgroundColor = theme.palette.background.paper;


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
            <Box
                sx={{
                    ".rdw-editor-toolbar": {
                        backgroundColor: theme.palette.secondary.main, // Cor do toolbar
                        borderRadius: "8px",
                        padding: "5px",
                    },
                    ".rdw-option-wrapper": {
                        backgroundColor: theme.palette.background.paper, // Cor dos botões
                        borderRadius: "4px",
                        margin: "2px",
                    },
                    ".rdw-option-active": {
                        backgroundColor: theme.palette.background.default, // Cor quando ativo
                        borderColor: theme.palette.background.default,
                      
                    },
                    ".rdw-dropdown-wrapper": {
                        display: "inline-block",
                        visibility: "visible",
                        zIndex: 9999
                    }
                }}
            >
                <Editor
                    placeholder="Digite seu texto aqui..."
                    editorState={editorState}
                    toolbarClassName="toolbar-class"
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    editorStyle={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        minHeight: "200px",
                        maxHeight: "300px",
                        color: colorFont,
                        overflowY: "auto",
                        "&:focus": {
                            borderColor: theme.palette.primary.main,
                        },
                        zIndex: 9999,
                    }}
                    onEditorStateChange={onEditorStateChange}
                    toolbarStyle={{
                        backgroundColor: backgroundColor,
                        color: colorFont,
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                    toolbar={ConfigToolbar()}
                     /* toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'history'],
                        inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
                        blockType: {
                            inDropdown: false,
                            options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote', 'Code'],
                        },
                        fontSize: {
                            options: [8, 10, 12, 16, 24, 32, 48] // Teste com mais opções
                        },
                        fontFamily: {
                            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'] // Adicione mais opções para testar
                        },
                        list: { options: ['unordered', 'ordered'] },
                        textAlign: { options: ['left', 'center', 'right', 'justify'] },
                        history: { options: ['undo', 'redo'] }
                    }}*/
                    localization={{
                        locale: 'pt',
                    }}
                /></Box>
        </div >
    );
};

export default TextEditor;
