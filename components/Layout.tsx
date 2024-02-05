import Head from "next/head";
import Header from "./Header";
import { ChildProps } from "@/utils/types";

const Layout: React.FC<ChildProps> = ({ pageTitle, children }) => {

	return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      <Head>
        <title>Blog by Nuya - {pageTitle}</title>
        <meta name="description" content="blog test by Synapsis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body>
        <Header />
        <div className="container-sm px-lg-0">{children}</div>
      </body>
    </div>
  );
};

export default Layout;
