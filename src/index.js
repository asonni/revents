import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './index.css';
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/common/util/ScrollToTop';

const store = configureStore();

const rootEL = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr
            progressBar
            transitionIn="fadeIn"
            position="bottom-right"
            transitionOut="fadeOut"
          />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    rootEL
  );
};

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  });
}

store.firebaseAuthIsReady.then(() => {
  render();
});

registerServiceWorker();
