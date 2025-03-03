import PropTypes from 'prop-types';
import styles from './Title.module.scss';

export const Title = ({ children, textAlign = 'left' }) => {
	return (
		<h3 className={styles.title} style={{ textAlign }}>
			{children}
		</h3>
	);
};

Title.propTypes = {
	children: PropTypes.node.isRequired,
};
