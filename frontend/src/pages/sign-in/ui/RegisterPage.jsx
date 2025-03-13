import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input, Title } from '@/shared/ui';
import { request, ROLE } from '@/shared/lib';
import { setUser } from '@/entities/user/model/actions';
import { selectUserRole } from '@/entities/user/model/selectors';
import { regFormDefaultValues, regFormSchema } from '../model';
import styles from './SignInPage.module.scss';

const RegisterPage = () => {
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	const onSubmit = ({ login, password }) => {
		request('/api/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.authorize}>
			<Title>Регистрация</Title>
			<Form
				defaultValues={regFormDefaultValues}
				resolver={yupResolver(regFormSchema)}
				onSubmit={onSubmit}
				buttonText="Зарегистрироваться"
			>
				<Input name="login" placeholder="Ваше имя" />
				<Input name="password" type="password" placeholder="Придумайте пароль" />
				<Input name="passcheck" type="password" placeholder="Повторите пароль" />
				<p className={styles.confirm}>
					Нажимая эту кнопку, торжественно клянусь, что&nbsp;замышляю только
					шалость!
				</p>
			</Form>
			{serverError && <p className="error">{serverError}</p>}
		</div>
	);
};

export default RegisterPage;
