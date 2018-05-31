<?php

require 'functions.php';
require 'db.php';

//CONNECT TO DB
$conn = connect($config);
if ( !$conn ) die ('Problem connecting');