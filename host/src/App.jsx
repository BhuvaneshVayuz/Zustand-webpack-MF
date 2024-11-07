import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from 'reduxApp/store';
import router from './router';

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <div className='bg-slate-50 h-[650px] min-h-screen'>
      <RouterProvider router={router} />
    </div>
  </Provider>
);
