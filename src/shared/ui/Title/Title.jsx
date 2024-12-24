import PropTypes from 'prop-types';
import styles from './Title.module.scss';

export const Title = ({ children }) => {
	return <h3 className={styles.title}>{children}</h3>;
};

Title.propTypes = {
	children: PropTypes.node.isRequired,
};
