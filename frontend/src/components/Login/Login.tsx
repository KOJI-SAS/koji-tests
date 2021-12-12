import { useState } from 'react';
import c from './Login.module.css';

interface Props {
  onSubmit: Function;
}

const Login = (props: Props) => {
  const [username, setUsername] = useState('');
  return (
    <div className={c.login}>
      <div className={c.form}>
        <div className={c.title}>Who are you dear sir?</div>
        <div className={c.inputContainer}>
          <input
            placeholder="Enter username"
            className={c.input}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className={c.buttonContainer}>
          <button className={c.button} onClick={() => props.onSubmit(username)}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
