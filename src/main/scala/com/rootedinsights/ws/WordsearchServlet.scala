package com.rootedinsights.ws

import org.scalatra._
import scalate.ScalateSupport
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._

class WordsearchServlet extends WordsearchStack with JacksonJsonSupport {

  protected implicit val jsonFormats: Formats = DefaultFormats

  case class Flower(slug: String, name: String)

  object FlowerData {
  
    /**
     *    * Some fake flowers data so we can simulate retrievals.
     *       */
    var all = List(
        Flower("yellow-tulip", "Yellow Tulip"),
        Flower("red-rose", "Red Rose"),
        Flower("black-rose", "Black Rose"))
  }

  before() {
    contentType = formats("json")
  }

  get("/flowers"){
    FlowerData.all
  }

  post("/create") {
    parsedBody.extract[Flower]
  }

  get("/") {
    <html>
      <body>
        <h1>Hello, world!</h1>
        Say <a href="hello-scalate">hello to Scalate</a>.
      </body>
    </html>
  }

}
