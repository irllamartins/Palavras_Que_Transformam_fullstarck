
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { Text } from '../model/text';

export const textSchema: yup.ObjectSchema<Text> = yup.object().shape({
    title: yup.string().required('Necessario titulo'),
    body: yup.string().required('Quantidade minima insuficiente(min. 5 palavras)'),
    number_words: yup.number()
        .min(5, 'Quantidade minima insuficiente(min. 5 palavras)')
        .required('Age is required'),
    user_id: yup.string().required(),
    created_at: yup.string(),
    update_at: yup.string(),
    achieved_goal: yup.boolean(),
    id: yup.string().required()
})

type TextSchema = yup.InferType<typeof textSchema>

export default TextSchema