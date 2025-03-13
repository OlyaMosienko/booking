import { useFormContext } from 'react-hook-form';
import styles from './Input.module.scss';

export const Input = ({ name, type = 'text', style, ...rest }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	if (!name) {
		throw new Error("The 'name' prop is required for Hidden component.");
	}

	return (
		<label style={style}>
			<input className={styles.input} {...register(name)} type={type} {...rest} />
			{!!errors[name] && <p className="error">{String(errors[name]?.message)}</p>}
		</label>
	);
};
