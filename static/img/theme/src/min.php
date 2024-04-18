<?php

	//die();

	$currentDir = str_replace('\\', '/', __DIR__);
	$resultsDir = str_replace('\\', '/', realpath(__DIR__ . '/..'));
	//$resultsDir = $currentDir . '/min';
	
	function minify ($svg) {
		$svg = preg_replace("#<!--.*-->#", "", $svg);
		$svg = preg_replace("#[\t\r\n]#", " ", $svg);
		$svg = preg_replace("#[\s]+#", " ", $svg);
		$svg = str_replace(["<!DOCTYPE ", "<svg "], ["\n<!DOCTYPE ", "\n<svg "], $svg);
		$svg = str_replace('> <', '><', $svg);
		return $svg;
	}
	
	$di = new \DirectoryIterator($currentDir);
	foreach ($di as $item) {
		$ext = mb_strtolower($item->getExtension());
		if ($ext !== 'svg') continue;
		$fileNameInclExt = $item->getFilename();
		$fileNameExclExt = mb_substr($fileNameInclExt, 0, -4);
		if ($fileNameExclExt === 'test') continue;
		$srcFullPath = $currentDir . '/' . $fileNameInclExt;
		$targetFullPath = $resultsDir . '/' . $fileNameExclExt . '.min.svg';
		if (file_exists($targetFullPath))
			unlink($targetFullPath);
		$fileContent = file_get_contents($srcFullPath);
		$fileContent = minify($fileContent);
		file_put_contents($targetFullPath, $fileContent);
	}
	
	echo 'ok';

	