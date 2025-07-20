import React from "react"
import packageInfo from "../../../package.json"

import "./about-page.style.scss"

import Jumbotron from "../../components/jumbotron/jumbotron.component"
import NavBar from "../../components/nav-bar/nav-bar.component"
import Impression from "../../components/impression/impression.component"

const AboutPage = props => (
  <div id="AboutPage">
    <NavBar currentPage="About" />
    <header>
      <Impression id="comedy" />
    </header>
    <main>
      <Jumbotron
        title="About Broke-As"
        lead={packageInfo.description}
        content={[
          <React.Fragment>
            <p>version = {packageInfo.version}</p>
            <p>license = {packageInfo.license}</p>
            <p>developer = https://github.com/mtsafe</p>
            <p>support = {packageInfo.bugs.url}</p>
          </React.Fragment>,
          <React.Fragment>
            <p>Privacy Policy & Terms of Service: None yet.</p>
          </React.Fragment>,
          <React.Fragment>
            <p>
              Legal Disclaimers: As described in the introduction page. This app
              is not any giving legal or financial advice. This is for
              entertainment purposes only. No financial professionals were
              consulted in the creation of the app. Please seek out real
              professional help for your legal or financial problems.
            </p>
          </React.Fragment>,
          <React.Fragment>
            <p>
              Credits/Acknowledgments: This app was made using open source code,
              including but not limited to: React, NodeJS, Cypress, Jester, and
              SASS sources.
            </p>
          </React.Fragment>,
          <React.Fragment>
            <p>
              Brief Synopsis: This app is not for complex financial management
              like investments.
            </p>
          </React.Fragment>,
        ]}
      />
    </main>
  </div>
)

export default AboutPage
