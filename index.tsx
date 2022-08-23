import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { forEach } from 'react-bootstrap/cjs/ElementChildren';
const App = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [checkbox, setCheckbox] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const emailHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const checkboxHandler = (e) => {
    console.log(e);
    setCheckbox(e);
  };
  async function submiHandler(e) {
    e.preventDefault();
    fetch('https://reqres.in/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(token);
        setToken(data.token);
      })
      .catch((err) => {
        console.log('Error: ', { err });
        console.log('ERROR');
        setError(err);
      });
    console.log({ email, password });
  }
  useEffect(() => {
    console.log('token updated', { token });

    if (token && token !== '') {
      fetch('https://reqres.in/api/unknown', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log({ data });
          data.data.forEach((item) => {
            console.log('Name - ', item.name);
          });
        });
    }
  }, [token]);

  return (
    <div>
      <div>
        <div className="container">
          <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">
              <img
                src="https://doc-14-00-docs.googleusercontent.com/docs/securesc/85bbuho6h124le323gob36m1n4g05e2c/3duadldv28a99rimv5o347fpi6vbkjq5/1661251500000/12258978775788100312/11844020182505709440/1hvRAGrdq0SqFBZApx2--IcuDf-DOmOBH?e=view&ax=AI9vYm6UnYSwoQdTSt2cGFVlK_QXBrn1gjR769_Egk_ZUt4j52eLpbbRXZU0CpuWA38_PdAxvSxADnju0le3YXD1puxTro1KD03QQYiKcKNAczfIz4izoBIZ1gxZyKEXxGOGUH7hUPyKlfr-ESjNVQ5UjBgBNTW-9-3JiQkbAX868K7KuSo9hQH8aOYm0k2N_T92ASS3SMjkzEkfJlgci84mmNp1ANgT5vnUV9p5dWoN56-Ts7Szy-LPc9ei0gheLBGUpCeycMCwyMO9nH4gm4_7JLY5NZdtgqSZd-cplkV4xIaq6FodkxL_wN7NmIkZtUKPTKTbYd1Lwx-PzuYuqz7dsT7bhq4mzpo-ESyXSDSy2psXXY-sdUgCBBjpd4hpAaUPveoJ6naszR9etw7bSU2djixq31ZBnH52mGLX8AoHmji4APH02_nnZTg-tSLf-Hx39c2uBh_RB5KuuNZi1fTLltH2luTm050GX7fa4zbEvj84qDoCGorpJmyeVX1rSrUyfCOM6OCOY6gvEnTv219uqnb517Lo3EBL5G8gYimRPNMFgS7pEDXX4jAIL3cWdnekNoeX2XuenjyZkadCPxT2xgXVyA9Be_hcfRO2bBJNKZMc8TGgL71PdwIcs8JamUvk1TpDu_6Dp9PbsigQEPT6hOVUiWi7e2K11IKWXQt43k2tRHPxXpebPyNIdqKY9ZU2CzpXoeBqOZ68BgRdlux09RYVYNMLUcddV_NIhKX98wbW1WNvfF0u-oaOp41KmhojIuBhoTV8qrJrPjYznrUKO2cS5A&uuid=5fa72dd5-03b2-4ef3-af1c-07d9d468210f&authuser=0&nonce=irit3fpltm6go&user=11844020182505709440&hash=phpk63r8tjqk6pnmol9a0c18p2li4j32"
                alt="Wissen Logo"
              />
            </span>
          </nav>
          <h3>Hello there, Sign in to continue</h3>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {token && token !== '' && error == '' && (
            <div className="alert alert-success" role="alert">
              Logged In successfully
            </div>
          )}
          <div>
            <form onSubmit={submiHandler}>
              <div className="form-group col-6 my-2">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={emailHandler}
                />
              </div>
              <div className="form-group col-6 my-2">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={password}
                  onChange={passwordHandler}
                />
              </div>
              <div className="form-check col-6">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  onChange={() => checkboxHandler(!checkbox)}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  By creating or logging into your account you are agreeing with
                  our <b>Terms and Conditions</b>and <b>Privacy Policy</b>
                </label>
              </div>
              <button
                type="submit"
                className={
                  checkbox
                    ? 'd-block my-2 btn btn-primary col-6'
                    : 'd-block my-2 btn btn-primary col-6 disabled'
                }
              >
                Next
              </button>
              <p className="my-2 text-primary col-6">SignIn with Company SSO</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
