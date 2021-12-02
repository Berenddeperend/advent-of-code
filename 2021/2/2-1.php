
<?php
  $input = array_map("parseItem", explode("\n", file_get_contents("./input.txt")));

  function parseItem($item) {
    $ding = explode(" ", $item);
    $ding[1] = intval($ding[1]);
    return $ding;
  }

  $answer = array_reduce($input, function($acc, $curr) {
    switch ($curr[0]) {
      case "forward":
        return [
            "x" => $acc["x"] + $curr[1],
            "y" => $acc["y"]
          ];
        break;
      case "up":
        return [
            "x" => $acc["x"],
            "y" => $acc["y"] - $curr[1]
          ];
        break;
      case "down":
        return [
            "x" => $acc["x"],
            "y" => $acc["y"] + $curr[1]
          ];
        break;
    }
  }, ["x" => 0, "y" => 0]);

  var_dump($answer["x"] * $answer["y"]);
?>