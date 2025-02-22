import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import { Theme, Typography } from '@mui/material';

import { dateAndHour } from '../../components/date.and.hour/date';
import wordCounter from '../../store/application/utils/word.counter';
import { useForm } from 'react-hook-form';
import TextSchema, { textSchema } from '../../store/application/schema/text';
import { yupResolver } from '@hookform/resolvers/yup';
import { IActionDialog } from '../../store/duck/texts/types';
import { User } from '../../store/application/model/user';
import { Text } from '../../store/application/model/text';

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
  readonly text: Text | null
  readonly user: User | null

  handleClose(): void
  handleDialog(data: IActionDialog): void
  resetCreate(): void
  handleFormSubmit(text: TextSchema): void
}

const FormDialog = (props: IProps) => {
  const classes = useStyles();
  const { text, open, user, handleClose, handleFormSubmit } = props;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<TextSchema>({
    defaultValues: text ?? { user_id: user?.id, number_words: 0 } as Text,
    resolver: yupResolver(textSchema),
  });

  useEffect(() => {
    if (text) reset(text);
  }, [text, reset]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log(text)
      console.error("Erros no formulário:", errors);
    }
  }, [Object.keys(errors).length]);

  const createdAt = getValues("created_at") as string | undefined;
  const updatedAt = getValues("update_at") as string | undefined;
  const words = getValues("number_words") as number || 0;
  return (
    <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
      <DialogTitle>{text?.id ? "Editar Texto" : "Criar Texto"}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="titulo"
            label="Título"
            fullWidth
            className={classes.textfield}
            variant="standard"
            {...register("title")}
            helperText={errors?.title?.message || ""}
            error={!!errors?.title}
          />
          <TextField
            id="texto"
            required
            spellCheck={false}
            multiline
            fullWidth
            className={classes.textfield}
            rows={5}
            {...register("body")}
            helperText={errors.body?.message}
            error={!!errors.body}
            onChange={(event) => {
              const newBody = event.target.value;
          //    setValue("number_words", wordCounter(newBody));
            }}
          />
          <Typography sx={{ fontSize: 10 }} className={classes.text}>
            Palavras escritas: {words}
          </Typography>
          <Typography sx={{ fontSize: 10 }} className={classes.text}>
            Data da criação: {dateAndHour(createdAt)}
          </Typography>
          <Typography sx={{ fontSize: 10 }} className={classes.text}>
            Data da última modificação: {dateAndHour(updatedAt)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="text" size="small" disabled={words < 5}>
            {text?.id ? "SALVAR" : "CRIAR"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};


export default FormDialog;
