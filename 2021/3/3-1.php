<?php
    $input = explode("\n", file_get_contents("./input-sample.txt"));
    var_dump($input);

    $report = array_reduce($input, function($acc, $curr) {
        for($i = 0; i < strlen($curr); $i++) {
            
        }
        
        // array_map(function($d) {
        //     if($i === 0) {
        //         array_push($acc, [0 , 0]); //zeroes, ones
        //     }


        //     intval($d);
            

        // }, str_split($curr));
    }, []);

    var_dump($report);
    
?>