<?php
    $input = explode("\n", file_get_contents("input.txt"));
    $measurements = [];

    $windowSize = 3;

    for ($x = 0; $x < count($input); $x++) {
        if ($x <= count($input) - $windowSize) {
            $group = [];
            for ($y = 0; $y < $windowSize; $y++) {
                array_push($group, $input[$x + $y]);
            }
            array_push($measurements, array_sum($group));
        }
    }

    $increments = 0;

    for ($x = 1; $x <= count($measurements); $x++) {
        if($measurements[$x] > $measurements[$x -1]) {
            $increments++;
        }
    }


    var_dump($increments);
?>