
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
          "aim" => $acc["aim"], 
            "x" => $acc["x"] + $curr[1],
            "y" => $acc["y"] + ($curr[1] * $acc["aim"])
          ];
        break;
      case "up":
        return [
            "aim" => $acc["aim"] - $curr[1], 
            "x" => $acc["x"],
            "y" => $acc["y"]
          ];
        break;
      case "down":
        return [
            "aim" => $acc["aim"] + $curr[1], 
            "x" => $acc["x"],
            "y" => $acc["y"]
          ];
        break;
    }
  }, [
    "x" => 0,
    "y" => 0,
    "aim" => 0
  ]);

  var_dump($answer["x"] * $answer["y"]);
?>