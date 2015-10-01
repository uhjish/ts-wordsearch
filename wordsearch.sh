#!/bin/sh
exec scala "$0" "$@"
!#
object WordSearch {
val adjacent = (for( x<- -1 to 1; y <- -1 to 1) yield { (x,y) }).toList
  def dfsBacktrack(path: List[(Int,Int)], curX: Int, curY: Int, cells: List[List[Char]], srch: String):List[(Int,Int)] = {
    val updPath = (curX, curY) :: path
    val depth = updPath.length
    if (depth == srch.length && srch(depth) == cells(curX)(curY) ) path  
    else if (curX < 0 || curY < 0 || curX >= cells.length || curY >= cells(0).length) Nil
    else if (srch(depth) != cells(curX)(curY) ) Nil
    else if ( depth >= srch.length ) Nil
    else
      adjacent.flatMap { offs =>
        dfsBacktrack( updPath, curX+offs._1, curY+offs._2, cells, srch)
      }
    
  }

  def main(args: Array[String]) {
    val word = args(0).trim.toLowerCase
    val nrow = args(1).toInt
    val ncol = args(2).toInt
    val cells = args(3).split(",").map(x => if (x.trim.length > 0) x.trim.toLowerCase.head else '\0').grouped(ncol).map(_.toList).toList
    println("Hello, world! " + cells)
  }
}
WordSearch.main(args)
