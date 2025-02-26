import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme, Typography } from '@mui/material';

import { dateAndHour } from '../../components/date.and.hour/date';
import { Controller, useForm } from 'react-hook-form';
import TextSchema, { textSchema } from '../../store/application/schema/text';
import { yupResolver } from '@hookform/resolvers/yup';
import { IActionDialog } from '../../store/duck/texts/types';
import { User } from '../../store/application/model/user';
import { Text } from '../../store/application/model/text';
import { DeleteOutline } from '@mui/icons-material';
import TextEditor from '../../components/editor';

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
      color: `${theme.palette.primary.contrastText} `
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
  readonly text: Text | null
  readonly user: User | null

  handleClose(): void
  handleDialog(data: IActionDialog): void
  resetCreate(): void
  handleFormSubmit(text: TextSchema): void
  removeText(textId: string): void
}

const FormDialog = (props: IProps) => {
  const classes = useStyles();
  const { text, open, user, handleClose, handleFormSubmit, removeText } = props;
  const [wordsCount, setWordsCount] = useState(0);
  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TextSchema>({
    mode: "onChange",
    defaultValues: text ?? { user_id: user?.id, number_words: 0 } as Text,
    resolver: yupResolver(textSchema),
  });


  useEffect(() => {
    if (text && open === true) {
      reset(text)
    }
    else if (open === true) {
      reset({ user_id: user?.id })
    }
  }, [open, text]);

  useEffect(() => {
    if (Object.keys(errors)) {
      console.error("Erros no formulário:", errors);
    }
  }, [Object.keys(errors)]);

  const createdAt = getValues("created_at") as string | undefined;
  const updatedAt = getValues("update_at") as string | undefined;

  useEffect(()=>{
    setValue("number_words", wordsCount as unknown as never )
  },[setWordsCount])

  return (
    <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
      <DialogTitle>{text?.id ? "Editar Texto" : "Criar Texto"}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent sx={{ paddingBlock: 0 }}>
          <TextField
            required
            margin="normal"
            {...register("title")}
            //   label="Título"
            placeholder='Digite o Titulo'
            fullWidth
            className={classes.textfield}
            size='small'
            variant="outlined"
            helperText={errors?.title?.message}
            error={!!errors?.title}
          />
         <Controller
        name="body"
        control={control}
        render={({ field }) => (
          <>
          {console.log("antes editor",field.value)}
            <TextEditor
              value={field.value } 
              onChange={field.onChange} 
              setWordsCount={setWordsCount}
        
            
            />
            {/* Exibe erros se existirem */}
            {errors.body && <Typography color='error' variant='caption'>{errors.body.message}</Typography>}

          </>
        )}
      />
          {/* <TextField
            required
            spellCheck={false}
            multiline
            margin='normal'
            placeholder="Digite seu texto aqui"
            fullWidth
            className={classes.textfield}
            rows={5}
            {...register("body", {
              onChange: (event) => {
                const count = wordCounter(event.target.value || "");
                setValue("number_words", count as unknown as never);
              }
            })}
            helperText={errors.body?.message}
           
          />*/}
          <Typography
            variant='body1'
            sx={{ fontSize: 10 }}
            className={classes.text}
          >
            Palavras escritas: {wordsCount}
          </Typography>
          <Typography
            variant='body1'
            sx={{ fontSize: 10 }}
            className={classes.text}
          >
            Data da criação: {dateAndHour(createdAt)}
          </Typography>
          <Typography
            variant='body1'
            sx={{ fontSize: 10 }}
            className={classes.text}
          >
            Data da última modificação: {dateAndHour(updatedAt)}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>

          <Button
            color="error"
            disabled={!text?.id}
            variant="text"
            size="small"
            startIcon={<DeleteOutline />}
            onClick={() => text?.id && removeText(text.id)}>
            Excluir texto
          </Button>

          <Button
            type="submit"
            variant="text"
            size="small"
            disabled={Object.keys(errors).length>0}
          >
            {text?.id ? "SALVAR" : "CRIAR"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};


export default FormDialog;
