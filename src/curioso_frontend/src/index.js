import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import App from "./App";

import { InternetIdentity } from "@connect2ic/core/providers/internet-identity"
import { InfinityWallet } from "@connect2ic/core/providers/infinity-wallet"
import { createClient } from "@connect2ic/core"
import { Connect2ICProvider } from "@connect2ic/react"
import "@connect2ic/core/style.css"
import * as counter from "../../../.dfx/local/canisters/curioso_backend"

const client = createClient({
    canisters: {
      counter,
    },
    providers: [
        new InternetIdentity(), 
    ],
  })
     

ReactDOM.render(<Connect2ICProvider client={client}><App/></Connect2ICProvider>, document.getElementById("app"));

