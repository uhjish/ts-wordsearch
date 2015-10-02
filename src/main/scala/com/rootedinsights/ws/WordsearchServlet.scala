package com.rootedinsights.ws

import org.scalatra._
import scalate.ScalateSupport
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._
import org.scalatra.CorsSupport




case class WordsearchRequest(rows: List[List[String]], word: String)

class WordsearchServlet extends WordsearchStack with JacksonJsonSupport with CorsSupport {

  protected implicit val jsonFormats: Formats = DefaultFormats
  
  options("/*"){
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
  }

  before() {
    contentType = formats("json")
  }

  post("/search") {
    val wsr = parsedBody.extract[WordsearchRequest]
    val chargrid = wsr.rows.map( r => r.map(x => if (x.trim.length > 0) x.trim.toLowerCase.head else '\0') ).toList
    val ws = new WordSearch(chargrid)
    ws.dfsSearch(wsr.word)
  }

  get("/") {
    "post a json request with fields rows (array of arrays) and word (string to search for) to the search endpoint"
  }

}
