import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import { getDepartments } from "../utils/api";
import { Provider } from "next-auth/client";
import "../styles/index.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout departments={pageProps.departments}>
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.css"
        />
        <script src="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js" />
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const departments = await getDepartments();
  // Pass the data to our page via props
  return { ...appProps, pageProps: { departments, path: ctx.pathname } };
};

export default MyApp;
