import { useEffect } from 'react';
import { NameProvider } from '../helpers/context/name';
import PropTypes from 'prop-types';
export default function MyApp({Component, pageProps}) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <div>
        <NameProvider> <Component {...pageProps} /> </NameProvider>
    </div>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};