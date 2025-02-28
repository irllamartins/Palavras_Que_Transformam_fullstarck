import { FormatBold, FormatItalic, FormatSize, FormatUnderlined } from '@mui/icons-material';
import { Button, IconButton, Theme, useTheme } from '@mui/material';
import BoldLight from '../../assert/bold_light.png'
import BoldDark from '../../assets/bold_dark.png'

export const ConfigToolbar = () => {
  const theme = useTheme();
  const colorFont = theme.palette.getContrastText(theme.palette.primary.main)
  const backgroundColor = theme.palette.background.paper;

  return {
    options: [
      "inline",
      "blockType",
      "fontSize",
      "fontFamily",
      // "list",
      "textAlign",
      //  "colorPicker",
      //  "link",
      //   "emoji",
      //  "image",
      //  "remove",
      "history",
    ],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough", "monospace", "superscript", "subscript"],
      bold: {
        // icon: BoldLight
      }
    },
    blockType: {
      inDropdown: false,

      options: ["Normal", "H1", "H2", "H3", "Blockquote", "Code"]
    },
    fontSize: {
      inDropdown: true,
      options: [8, 10, 12, 16, 24, 32, 48]
    },
    fontFamily: { options: ["Arial", "Georgia", "Impact", "Tahoma", "Times New Roman", "Verdana"] },
    // list: { options: ["unordered", "ordered"] },
    textAlign: { options: ["left", "center", "right", "justify"] },
    // colorPicker: { colors: ["#000000", "#FF0000", "#00FF00", "#0000FF"] },
    // link: { options: ["link", "unlink"] },
    // emoji: { className: undefined },
    // image: {
    //   urlEnabled: true,
    //   uploadEnabled: true,
    //   previewImage: true,
    //   alignmentEnabled: true,
    //   inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    //   alt: { present: true, mandatory: false },
    // },
    history: { options: ["undo", "redo"] },
    remove: { className: undefined },
  }

}