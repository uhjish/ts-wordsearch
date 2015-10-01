#!/bin/sh
exec scala "$0" "$@"
!#
object WordSearch {

def dfsBacktrack(path: List[(Int,Int)], curX: Int, curY: Int, cells: List[List[String]], srch: String) = {
    val updPath = (curX, curY) :: path
    val depth = updPath.length

    for (xoffs <- -1 to 1; yoffs <- -1 to 1){
      dfsBacktrack( updPath, curX+xoffs, curY+yoffs, cells, srch)
    }
  }

  def main(args: Array[String]) {
    val word = args(0).trim.toLowerCase
    val nrow = args(1).toInt
    val ncol = args(2).toInt
    val cells = args(3).split(",").map(x => x.trim.toLowerCase).grouped(ncol).map(_.toList).toList
    println("Hello, world! " + cells)
  }
}
WordSearch.main(args)
