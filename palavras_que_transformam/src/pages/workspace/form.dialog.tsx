import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { Theme, Typography } from '@mui/material';
import { useState } from "react";
import { dateAndHour } from '../../components/date.and.hour/date';
import clsx from 'clsx'
import Text from "../../store/application/model/text"
import wordCounter from '../../store/application/utils/word.counter';
import { useSelector } from 'react-redux';
import User from '../../store/application/model/user';


const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    color: `${theme.palette.primary.contrastText}`
  },
  text: {
    color: `${theme.palette.primary.contrastText}`,
  },
  textfield: {
    color: `${theme.palette.primary.contrastText}`,
    '& .MuiInputBase-root': {
      color: `${theme.palette.primary.contrastText}`
    },
    '& .MuiFormLabel-root': {
      color: `${theme.palette.primary.contrastText}`
    },
  },
  info: {
    fontSize: 10
  },
  paper: {
    minWidth: "70%"
  }
}))

interface IProps {
  readonly open: boolean
  readonly text: Text
  readonly user: User | null

  handleClose(): void
  handleDialog(dialog: any): void
  createTextRequest(text: Text): void
  updateTextRequest(text: Text): void
  resetCreate(): void
}

const FormDialog = (props: IProps) => {
  const classes = useStyles()

  const {
    user,
    text,
    open,
    handleClose,
    createTextRequest,
    updateTextRequest,
    resetCreate
  } = props


  const [textData, setTextData] = useState<Text>(new Text().fromJSON({ ...text?.toJSON(), user_id: user?.id }))
  const [words, setWords] = useState<number>(0)

  React.useEffect(() => {
    if (text) {
      setTextData(new Text().fromJSON({ ...text.toJSON(), user_id: user?.id }))
      setWords(wordCounter(text.body))
    }
  }, [text])
 
  return <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
    <DialogTitle></DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        required
        margin="dense"
        id="titulo"
        label="Titulo"
        fullWidth
        className={classes.textfield}
        variant="standard"
        value={textData.title || ""}
        helperText={
          textData.title?.trim() === "" ?
            "Quantidade minima insuficiente" : undefined
        }
        onChange={event => {
          const newTitle = event.target.value
          setTextData((prevTextData: Text) => new Text().fromJSON({ ...prevTextData.toJSON(), title: newTitle }))
        }}
      />
      <TextField
        id="texto"
        autoFocus
        required
        spellCheck={false}
        multiline
        fullWidth
        className={classes.textfield}
        rows={5}
        value={textData.body || ""}
        helperText={
          wordCounter(textData.body) < 5 ?
            "Quantidade minima insuficiente(min. 5 palavras)" : undefined
        }
        onChange={event => {
          const newBody = event.target.value
          const value = wordCounter(newBody)
          setTextData((prevTextData: Text) =>
            new Text().fromJSON({
              ...prevTextData.toJSON(),
              body: newBody, number_words: value
            }))
            console.log(textData.number_words)  
          setWords(value)
        }}
      />
      {/*<Editor />*/}


      <Typography sx={{ fontSize: 10 }} className={classes.text}>Palavras escritas: {words}</Typography>
      <Typography sx={{ fontSize: 10 }} className={classes.text}>Data da criação: {dateAndHour(textData?.created_at)}</Typography>
      <Typography sx={{ fontSize: 10 }} className={classes.text}>Data da utima modificação: {dateAndHour(textData?.update_at)}</Typography>

    </DialogContent>
    <DialogActions>
      <Button
        disabled={words >= 5 ? false : true}
        onClick={() => {
          textData.id ? updateTextRequest(textData) : createTextRequest(textData)
          handleClose()
        }}>
        {text?.id ? "SALVAR" : "CRIAR"}</Button>
    </DialogActions>
  </Dialog>
}
export default FormDialog 