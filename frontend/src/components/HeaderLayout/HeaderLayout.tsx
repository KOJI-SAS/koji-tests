import { User } from '../../shared/entities';
import c from './HeaderLayout.module.css';

interface Props {
  user: User;
  children: React.ReactNode;
  onLogout: () => void;
}

const HeaderLayout = (props: Props) => {
  const { children, user, onLogout } = props;
  return (
    <div className={c.headerLayout}>
      <div className={c.header}>
        <div>Hello {user.username}</div>
        <div>
          <button className={c.button} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className={c.body}>{children}</div>
    </div>
  );
};

export default HeaderLayout;
