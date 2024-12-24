import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Title } from '../../../shared/ui/Title/Title';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/Input/Input';
import { server } from '../../../shared/bff';
import styles from './SignInPage.module.scss';
import { useResetForm } from '../lib/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/entities/user/model/actions';
import { selectUserRole } from '@/entities/user/model/selectors';
import { ROLE } from '@/shared/lib';
import { Navigate } from 'react-router-dom';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # и %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(20, 'Неверно заполнен пароль. Максимум 20 символов'),
	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Пароль не совпадает'),
});

export const RegisterPage = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.authorize}>
			<Title>Регистрация</Title>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Ваше имя"
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Придумайте пароль"
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Повторите пароль"
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				<p className={styles.confirm}>
					Нажимая эту кнопку, торжественно клянусь, что&nbsp;замышляю только
					шалость!
				</p>
			</form>
			{errorMessage && <div>{errorMessage}</div>}
		</div>
	);
};
