import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { App } from 'app/containers/App';

// import { ReactQueryDevtools } from 'react-query/devtools';
import 'shared/styles/icon-font/style.css';
import 'shared/styles/style.scss';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const queryClient = new QueryClient();
// const reactQueryDevTools = process.env.REACT_QUERY_DEV_TOOL === 'true';

root.render(
  <QueryClientProvider client={queryClient}>
    {/* {!reactQueryDevTools || <ReactQueryDevtools initialIsOpen={true} />}*/}
    <App />
  </QueryClientProvider>,
);
