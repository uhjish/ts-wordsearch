package wordsearch.css

import wordsearch.components.{TopNav, LeftNav}
import wordsearch.pages.{HomePage, ItemsPage}
import TopNav.Style

import scalacss.ScalaCssReact._
import scalacss.mutable.GlobalRegistry
import scalacss.Defaults._

object AppCSS {

  def load = {
    GlobalRegistry.register(
      GlobalStyle,
      Style,
      LeftNav.Style,
      ItemsPage.Style,
      HomePage.Style)
    GlobalRegistry.onRegistration(_.addToDocument())
  }
}
