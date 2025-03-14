import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { setUser } from '@/entities/user/model/actions';
import { selectUserRole } from '@/entities/user/model/selectors';
import { AppRoutes, RoutePaths } from '@/shared/config/routeConfig';
import { Form, Input, Title } from '@/shared/ui';
import { request, ROLE } from '@/shared/lib';
import { signInDefaultValues, signInSchema } from '../model';
import styles from './SignInPage.module.scss';

const SignInPage = () => {
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

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

	if (roleId !== ROLE.GUEST) {
		return <Navigate to={RoutePaths[AppRoutes.MAIN]} />;
	}

	return (
		<div className={styles.authorize}>
			<Title>Вход</Title>
			<Form
				defaultValues={signInDefaultValues}
				resolver={yupResolver(signInSchema)}
				onSubmit={onSubmit}
				buttonText="Войти"
			>
				<Input name="login" placeholder="Ваше имя" />
				<Input name="password" type="password" placeholder="Пароль" />
				<p className={styles.confirm}>
					Нажимая эту кнопку, торжественно клянусь, что&nbsp;замышляю только
					шалость!
				</p>
			</Form>
			{serverError && <p className="error">{serverError}</p>}
			<div className={styles.register}>
				Не были у нас раньше?
				<Link to="/register">Зарегистрируйтесь!</Link>
			</div>
		</div>
	);
};

export default SignInPage;
