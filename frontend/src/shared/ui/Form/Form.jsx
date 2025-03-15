import { FormProvider, useForm } from 'react-hook-form';
import styles from './Form.module.scss';
import { Button } from '..';

export const Form = ({
	defaultValues,
	resolver,
	onSubmit,
	children,
	buttonText,
	...rest
}) => {
	const methods = useForm({ defaultValues, resolver });

	const {
		handleSubmit,
		formState: { isDirty },
	} = methods;

	return (
		<FormProvider {...{ ...methods, onSubmit }}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)} {...rest}>
				{children}
				<Button disabled={!isDirty} type="submit">
					{buttonText}
				</Button>
			</form>
		</FormProvider>
	);
};
