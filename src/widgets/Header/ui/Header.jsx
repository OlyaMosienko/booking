import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../../shared/ui/Logo/Logo';
import { Button } from '../../../shared/ui/Button/Button';
import styles from './Header.module.scss';
import { ROLE } from '@/shared/lib';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUserLogin,
	selectUserRole,
	selectUserSession,
} from '@/entities/user/model/selectors'; // TODO юзера видимо надо в виджеты или в шаред
import { logout } from '@/entities/user/model/actions';
import LogoutIcon from '@/shared/assets/log-out.svg?react';

export const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);
	const userLogin = useSelector(selectUserLogin);
	const userSession = useSelector(selectUserSession);

	return (
		<header className={styles.header}>
			<div className="container">
				<div className={styles.header__box}>
					<Logo />
					<nav className={styles.header__nav}>
						<Link to="/about" className={styles.header__link}>
							О гостинице
						</Link>
						<Link to="/favorites" className={styles.header__link}>
							Избранное
						</Link>
						<Link to="/bookings" className={styles.header__link}>
							Мои брони
						</Link>
						{roleId === ROLE.ADMIN ? (
							<Link to="/admin" className={styles.header__link}>
								Панель администратора
							</Link>
						) : null}
					</nav>
					{roleId === ROLE.GUEST ? (
						<Button onClick={() => navigate('/login')}>
							Вход / регистрация
						</Button>
					) : (
						<Button onClick={() => dispatch(logout(userSession))}>
							{userLogin}
							<LogoutIcon />
						</Button>
					)}
				</div>
			</div>
		</header>
	);
};
