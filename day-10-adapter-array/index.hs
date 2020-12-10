import Data.List
import qualified Data.Text as T
import qualified Data.Text.IO as TIO
import System.Environment

buildNodes :: [Integer] -> [(Integer, Integer)] -> [(Integer, Integer)]
buildNodes [] nodes = nodes
buildNodes (val : rest) nodes =
  buildNodes rest ((val, nbPaths) : nodes)
  where
    predNodes = filter (\(v, _) -> val - v <= 3) nodes
    paths = map ((\nb -> if nb == 0 then 1 else nb) . snd) predNodes
    nbPaths = sum paths

nbPossiblePaths :: [Integer] -> Integer
nbPossiblePaths adapters = snd (head nodes)
  where
    nodes = buildNodes adapters []

readLines :: IO [String]
readLines = do
  args <- getArgs
  content <- TIO.readFile (head args)
  return (lines (T.unpack (T.strip content)))

readAdapters :: IO [Integer]
readAdapters = do
  lines <- readLines
  let adapters = sort $ map (\x -> read x :: Integer) lines
  let allAdapters = [0] ++ adapters ++ [maximum adapters + 3]
  return allAdapters

addPairs :: (Int, Int) -> (Int, Int) -> (Int, Int)
addPairs (a, b) (c, d) = (a + c, b + d)

nbDiffs :: [Integer] -> (Int, Int)
nbDiffs [] = (0, 0)
nbDiffs [_] = (0, 0)
nbDiffs (a : b : rest) = addPairs (d1, d2) (nbDiffs (b : rest))
  where
    d = b - a
    d1 = if d == 1 then 1 else 0
    d2 = if d == 3 then 1 else 0

puzzle1 :: [Integer] -> Int
puzzle1 adapters = d1 * d3
  where
    (d1, d3) = nbDiffs adapters

main = do
  adapters <- readAdapters
  print (puzzle1 adapters)
  print (nbPossiblePaths adapters)
