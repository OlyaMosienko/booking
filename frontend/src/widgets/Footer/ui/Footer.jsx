import { Logo } from '@/shared/ui/Logo/Logo';
import GitHubSVG from '@/shared/assets/github.svg?react';
import styles from './Footer.module.scss';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className="container">
				<div className={styles.footer__box}>
					<Logo />
					<div className={styles.footer__text}>
						<p>Адрес: г. Лондон, Чаринг-Кросс-Роуд или Косая аллея, 1</p>
						<p>Письма отправляйте совиной почтой по адресу выше</p>
					</div>
					<div className={styles.footer__socials}>
						<a href="https://github.com/OlyaMosienko">
							<GitHubSVG stroke="var(--bg-color)" />
						</a>
						<a href="https://github.com/OlyaMosienko">
							<GitHubSVG stroke="var(--bg-color)" />
						</a>
						<a href="https://github.com/OlyaMosienko">
							<GitHubSVG stroke="var(--bg-color)" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
