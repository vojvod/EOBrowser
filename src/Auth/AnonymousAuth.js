// import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
// import { requestAuthToken } from '@sentinel-hub/sentinelhub-js';

import './Auth.scss';

export default function AnonymousAuth({ setAnonToken }) {
  useEffect(() => {
    async function getToken() {
      const { data } = await axios({
        method: 'post',
        url: 'http://localhost.c/eobrowser.php',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });
      setAnonToken(data.access_token);
    }
    getToken();
  }, []);

  return null;
}

// function requestAuthToken(clientId, clientSecret) {
//   return awaiter(this, void 0, void 0, function* () {
//     const response = yield axios({
//       method: 'post',
//       url: 'http://localhost.c/eobrowser.php',
//       headers: { 'content-type': 'application/x-www-form-urlencoded' },
//       data: `grant_type=client_credentials&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}`,
//     });
//     return response.data.access_token;
//   });
// }

// export default function AnonymousAuth({ setAnonToken }) {
//   useEffect(() => {
//     async function getToken() {
//       const clientId = `${process.env.REACT_APP_CLIENTID}`;
//       const clientSecret = `${process.env.REACT_APP_CLIENT_SECRET}`;
//       const authToken = await requestAuthToken(clientId, clientSecret);
//       setAnonToken(authToken);
//     }
//     getToken();
//   }, []);

//   return null;
// }

// export default class AnonymousAuth extends React.Component {
//   CLIENT_ID = process.env.REACT_APP_ANONYMOUS_AUTH_CLIENT_ID;
//   RECAPTCHA_SITE_KEY = process.env.REACT_APP_CAPTCHA_SITE_KEY;
//   GRANT_TYPE = 'client_credentials';
//   UPDATE_SECONDS_BEFORE_EXPIRY = 60;
//   iFrame = undefined;
//   captchaRef = undefined;

//   componentDidMount() {
//     window.addEventListener('message', e => {
//       if (e.data.access_token) {
//         this.props.setAnonToken(e.data.access_token);
//         const tokenExpiresIn = (e.data.expires_in - this.UPDATE_SECONDS_BEFORE_EXPIRY) * 1000;
//         this.revokeTokenTimeout = setTimeout(() => {
//           this.captchaRef.executeCaptcha();
//         }, tokenExpiresIn);
//       }
//     });
//   }

//   onCaptchaExecuted = token => {
//     this.iFrame.src =
//       process.env.REACT_APP_AUTH_BASEURL +
//       'oauth/token/assisted?client_id=' +
//       this.CLIENT_ID +
//       '&redirect_uri=not_used' +
//       '&response_type=token&grant_type=' +
//       this.GRANT_TYPE +
//       '&recaptcha=' +
//       token;
//   };

//   render() {
//     return (
//       <iframe className="anon-frame" ref={node => (this.iFrame = node)} title="auth">
//         <Captcha
//           ref={node => (this.captchaRef = node)}
//           onExecute={this.onCaptchaExecuted}
//           sitekey={this.RECAPTCHA_SITE_KEY}
//           action="token_assisted_anonymous"
//         />
//       </iframe>
//     );
//   }
// }

// class Captcha extends React.Component {
//   componentDidMount() {
//     this.loadCaptchaScript();
//   }

//   loadCaptchaScript = () => {
//     if (!window.grecaptcha) {
//       const script = document.createElement('script');
//       script.type = 'text/javascript';
//       script.async = true;
//       script.onload = e => {
//         this.executeCaptcha();
//       };
//       script.src = 'https://www.google.com/recaptcha/api.js?render=' + this.props.sitekey;
//       this.instance.appendChild(script);
//     }
//   };

//   executeCaptcha = () => {
//     window.grecaptcha.ready(() => {
//       window.grecaptcha
//         .execute(this.props.sitekey, {
//           action: this.props.action,
//         })
//         .then(captchaToken => {
//           this.props.onExecute(captchaToken);
//         });
//     });
//   };

//   render() {
//     return <div ref={el => (this.instance = el)} />;
//   }
// }
