import { FormProvider, useForm } from 'react-hook-form';
import styles from './Form.module.scss';

export const Form = ({ defaultValues, resolver, onSubmit, children, ...rest }) => {
	const methods = useForm({ defaultValues, resolver });
	const { handleSubmit } = methods;

	return (
		<FormProvider {...{ ...methods, onSubmit }}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)} {...rest}>
				{children}
			</form>
		</FormProvider>
	);
};
