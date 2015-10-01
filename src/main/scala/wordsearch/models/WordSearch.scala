package wordsearch.models


class WordSearch(cells: List[List[Char]]) {

  // enumerate the 8 adjacent cells - compass directions
  val adjacent = List((-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)) 
  val nrow = cells.length
  val ncol = cells(0).length


  def dfsSearch(srch: String) = {
    // depth first search for a given word in grid

    def dfsBacktrackR(path: List[(Int,Int)], row: Int, col: Int):List[(Int,Int)] = {
      // recursive method for dfs

      // keep track of the path taken here
      val updPath = (row, col) :: path
      val depth = updPath.length

      //var curStr = path.map { x => cells(x._1)(x._2)}
      //println( "row: " + row + " col: " + col + " depth: " + depth + " cur: " + curStr + " " + path)

      // base and recursive cases 
      if (row < 0 || col < 0 || col >= ncol || row >= nrow) Nil
      else if ( depth > srch.length ) Nil
      else if (srch(depth-1) != cells(row)(col) ) Nil 
      else if (srch(depth-1) == cells(row)(col) && depth == srch.length) updPath 
      else
        adjacent.flatMap { offs =>
          //alternatives for flatmap? seems like it should be a foldLeft but hitting type hell
          dfsBacktrackR( updPath, row+offs._1, col+offs._2 )
        }
    }

    //enumerate every point on the grid
    val coords = (0 until ncol).flatMap(c => (0 until nrow).map(r => (r,c)))

    coords.foldLeft(List[List[(Int,Int)]]()) { 
      (acc:List[List[(Int,Int)]], pos) =>
        // call the recursive traversal for each cell, keep non-empty paths
        val ret = dfsBacktrackR(List[(Int,Int)](), pos._1, pos._2)
        if (ret.length > 0) ret.reverse.take(srch.length) :: acc else acc 
      }
  }

}

