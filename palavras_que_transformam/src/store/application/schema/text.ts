import * as yup from 'yup';
import { Text } from '../model/text';
import wordCounter from '../utils/word.counter';

export const textSchema: yup.ObjectSchema<Text> = yup.object().shape({
  title: yup.string()
    .required('Necessário título'),
  body: yup.string()
    .required('Esse campo é obrigatório')
    .test(
      'min-words',
      'O texto deve conter pelo menos 5 palavras',
      function(value) {
        return wordCounter(value || '') >= 5;
      }
    ),
  number_words: yup.number()
    .positive()
    .integer()
    .required('Palavras são obrigatórias'),
  user_id: yup.string()
    .required(),
  created_at: yup.string(),
  update_at: yup.string(),
  achieved_goal: yup.boolean(),
  id: yup.string()
});

type TextSchema = yup.InferType<typeof textSchema>;

export default TextSchema;
