<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$time = date('r');
echo "data: John Percival's time is: {$time}\n\n";
flush();
?>