package wordsearch

import japgolly.scalajs.react._
import org.scalajs.dom

import scala.scalajs.js.JSApp
import scala.scalajs.js.annotation.JSExport
import wordsearch.css.AppCSS
import wordsearch.routes.AppRouter


object ReactApp extends JSApp {
  @JSExport
  override def main(): Unit = {
    AppCSS.load
    AppRouter.router().render(dom.document.body)
  }

}

