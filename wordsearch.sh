#!/bin/sh
exec scala "$0" "$@"
!#
object WordSearch {
  val adjacent = (-1 to 1).flatMap(x => (-1 to 1).map(y => (x,y))).filter( v => !(v._1 == 0 && v._2 == 0)).toList
  def dfsBacktrack( cells: List[List[Char]], srch: String) = {

    val nrow = cells.length
    val ncol = cells(0).length

    def dfsBacktrackR(path: List[(Int,Int)], row: Int, col: Int):List[(Int,Int)] = {
      val updPath = (row, col) :: path
      val depth = updPath.length
      var curStr = path.map { x => cells(x._1)(x._2)}
      //println( "row: " + row + " col: " + col + " depth: " + depth + " cur: " + curStr + " " + path)
      if (row < 0 || col < 0 || col >= ncol || row >= nrow) Nil
      else if ( depth > srch.length ) Nil
      else if (srch(depth-1) != cells(row)(col) ) Nil 
      else if (srch(depth-1) == cells(row)(col) && depth == srch.length) updPath 
      else
        adjacent.flatMap { offs =>
          dfsBacktrackR( updPath, row+offs._1, col+offs._2 )
        }
    }

    val coords = (0 until ncol).flatMap(c => (0 until nrow).map(r => (r,c)))
    coords.foldLeft(List[List[(Int,Int)]]()) { 
    (acc:List[List[(Int,Int)]], pos) => 
      val ret = dfsBacktrackR(List[(Int,Int)](), pos._1, pos._2)
      //println( "pos: " + pos + " ret: " + ret )
      if (ret.length > 0) ret.reverse.take(srch.length) :: acc else acc 
      }
  }

  def main(args: Array[String]) {
    val word = args(0).trim.toLowerCase
    val nrow = args(1).toInt
    val ncol = args(2).toInt
    val cells = args(3).split(",").map(x => if (x.trim.length > 0) x.trim.toLowerCase.head else '\0').grouped(ncol).map(_.toList).toList
    //println("Hello, world! " + cells)
    val hits = dfsBacktrack(cells, word)
    println(hits)
  }
}
WordSearch.main(args)
