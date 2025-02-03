import { FormProvider, useForm } from 'react-hook-form';
import styles from './Form.module.scss';
import { Button } from '..';

export const Form = ({ defaultValues, resolver, onSubmit, children, ...rest }) => {
	const methods = useForm({ defaultValues, resolver });
	const {
		handleSubmit,
		formState: { isDirty, isValid },
	} = methods;

	return (
		<FormProvider {...{ ...methods, onSubmit }}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)} {...rest}>
				{children}
				<Button disabled={!isDirty || !isValid} type="submit">
					Найти подходящий номер
				</Button>
			</form>
		</FormProvider>
	);
};
