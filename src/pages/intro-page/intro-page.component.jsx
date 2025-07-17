import React from "react"
import { Link } from "react-router-dom"

import "./intro-page.styles.scss"

import NavBar from "../../components/nav-bar/nav-bar.component"
import Impression from "../../components/impression/impression.component"

const IntroPage = props => (
  <div id="IntroPage">
    <NavBar currentPage="Intro" />
    <header>
      <Impression id="tragedy" />
    </header>
    <main>
      <div id="intro">
        <p className="">
          Let us start by saying,{" "}
          <span className="text-warning">"We are sorry."</span> It's a sad
          situtation that you need this app for your finances. You have fallen
          on hard times, and you are desperate for help. Your accounts are
          getting down to the wire. You are too ashamed to ask for help. You are
          not even sure anyone can help.
        </p>
        <p>
          <span className="text-info">"It's going to be okay."</span> Of course
          we don't actually know if it will be okay, but repeating this may help
          you feel better. This is important, because you need some confidence
          to face your situtation otherwise you just can't even.
        </p>
      </div>
      <div id="caveat" className="alert alert-dismissible alert-danger">
        <h2>STRONG WARNING!</h2>
        <p>
          Look, we are not accountants, lawyers, financial coaches, etc; we are
          just software engineers with a dumb app. We have no formal training in
          finances.{" "}
          <span className="text-muted">(We are not even good at math!)</span>{" "}
          Nonetheless, you have turned here for help...
        </p>
      </div>
      <Link to="/home">
        <button
          type="button"
          className="btn btn-link btn-lg btn-outline-success"
        >
          Click to Next Page
        </button>
      </Link>
    </main>
  </div>
)

export default IntroPage
