<h1>PUZZLE LIST</h1>

<table id="puzzlelist" class="puzzlelist" cellpadding="5px" >
<tr>
	<td><b>Puzzle</b></td>
	<td><b>High Score</b></td>
	<td><b>Record Holder</b></td>
</tr>
	<?php foreach ($puzzles as $puzzle) : ?>
		<tr>
			<td>
				<a href = "single.php?seedlev=<?= $puzzle['seedlev']; ?>" >
					<?= $puzzle['puzname']; ?>
				</a>
			</td>
			<td>
				<?= $puzzle['score']; ?>
			</td>
			<td>
				<?= $puzzle['recname']; ?>
			</td>		</tr>
	<?php endforeach;
	echo ("<tr><td></td><td><form action='single.php?seedlev=0' method='post'><input type='submit' id='randomButton' name='randomButton' class='controlButton' value='RANDOM PUZZLE'></form></td></tr>");

	echo ("<br>





		"); ?>

<tr><td></td><td><?= 'Page '. $page. ' of '. $lastPage.'<br/>'.$pagination ?></td></tr>
</table>
