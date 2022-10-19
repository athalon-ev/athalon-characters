import Document, { Html, Main, NextScript, Head } from 'next/document';
import { createGetInitialProps } from '@mantine/next'

const getInitialProps = createGetInitialProps();

class MyDocument extends Document {
	static getInitialProps = getInitialProps;
	// Only uncomment if you need to customize this behaviour
	// static async getInitialProps(ctx: DocumentContext) {
	//   const initialProps = await Document.getInitialProps(ctx)
	//   return {...initialProps}
	// }
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
