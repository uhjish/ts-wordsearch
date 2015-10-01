#!/bin/sh
exec scala "$0" "$@"
!#
object HelloWorld {
  def main(args: Array[String]) {
    val nrow = args(0).toInt
    val ncol = args(1).toInt
    val cells = args(2).split(",").map(x => x.trim.toInt).grouped(ncol).map(_.toList).toList
    println("Hello, world! " + cells)
  }
}
HelloWorld.main(args)
