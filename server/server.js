import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from 'cross-fetch';
import { getDataFromTree } from "@apollo/client/react/ssr";


const app = express();

app.use("*", (req, res) => {
	fs.readFile(path.resolve("./build/index.html"), "utf8", async (err, data) => {
		if (err) {
			console.log(err);
			return res.status(500).send("Something went wrong");
		}
		const client = new ApolloClient({
			ssrMode: true,
			link: new HttpLink({ uri: 'http://localhost:4002/', fetch }),
			cache: new InMemoryCache(),
		});

		const html = ReactDOMServer.renderToString(
			<ApolloProvider client={client}>
				<StaticRouter location={req.url} >
					<App />
				</StaticRouter>
			</ApolloProvider>
		);

		try {
			await getDataFromTree(html);
		} catch (error) {
			console.error('Error while running `getDataFromTree`', error);
		}

		return res.send(data.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
	});
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(3005, () => {
	console.log("App is launched");
});
