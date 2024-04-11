import React from 'react'
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";
import "./css/header.css"
import "./css/footer.css"
import "./css/homePage.css"
import "./css/loginPage.css"
import "./css/tripPage.css"
import "./css/table.css"
import App from "./App";


const app = ReactDOMClient.createRoot(document.getElementById("app"));

app.render(<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

            <App></App>

        </PersistGate>
    </Provider >
);
