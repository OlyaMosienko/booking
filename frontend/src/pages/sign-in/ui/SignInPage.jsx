import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setUser } from '@/entities/user/model/actions';
import { selectUserRole } from '@/entities/user/model/selectors';
import { Button, Input, Title } from '@/shared/ui';
import { request, ROLE } from '@/shared/lib';
import { useResetForm } from '../lib/hooks';
import { signInSchema } from '../model';
import styles from './SignInPage.module.scss';

const SignInPage = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(signInSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/api/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.authorize}>
			<Title>Вход</Title>
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
					placeholder="Пароль"
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Войти
				</Button>
				<p className={styles.confirm}>
					Нажимая эту кнопку, торжественно клянусь, что&nbsp;замышляю только
					шалость!
				</p>
			</form>
			{errorMessage && <div>{errorMessage}</div>}
			<div className={styles.register}>
				Не были у нас раньше?
				<Link to="/register">Зарегистрируйтесь!</Link>
			</div>
		</div>
	);
};

export default SignInPage;
