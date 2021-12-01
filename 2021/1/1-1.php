<?php
    $input = explode("\n", file_get_contents("input.txt"));
    $increments = 0;

    for ($x = 1; $x <= count($input); $x++) {
        if($input[$x] > $input[$x -1]) {
            $increments++;
        }
    }

    var_dump($increments);
?>