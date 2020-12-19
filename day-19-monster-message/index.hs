import Data.List
import qualified Data.Text as T
import qualified Data.Text.IO as TIO
import System.Environment

data Rule = Char Char | RuleRef Int | Rules [Rule] | Or Rule Rule deriving (Read, Show, Eq)

readLines :: IO [String]
readLines = do
  args <- getArgs
  content <- TIO.readFile (head args)
  return (lines (T.unpack (T.strip content)))

readRules :: IO [String]
readRules = do
  lines <- readLines
  return lines

main = do
  rules <- readRules
  print rules
