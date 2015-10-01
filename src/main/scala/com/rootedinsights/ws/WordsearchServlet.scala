package com.rootedinsights.ws

import org.scalatra._
import scalate.ScalateSupport

class WordsearchServlet extends WordsearchStack {

  get("/") {
    <html>
      <body>
        <h1>Hello, world!</h1>
        Say <a href="hello-scalate">hello to Scalate</a>.
      </body>
    </html>
  }

}
