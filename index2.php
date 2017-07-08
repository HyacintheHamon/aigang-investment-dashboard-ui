<!DOCTYPE html>
<html lang="lt">
<head>

	<title></title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">

	<link href="//fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&amp;subset=cyrillic-ext,latin-ext" rel="stylesheet">
	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="/css/style.min.css?_=<?php echo time() ?>" rel="stylesheet">
	
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.min.js"></script>
	
</head>
<body class="template-<?php echo isset($_GET['template']) ? $_GET['template'] : 'default' ?>">

	<?php require('templates/_block-site-header.php') ?>

	<main class="site-main">

		<?php 

			$_template_name = isset($_GET['template']) ? $_GET['template'] : 'default';
			require('templates/_template-'.$_template_name.'.php') 
		
		?>
		
	</main>
	

	
<footer class="site-footer">
	<div class="container">
	</div>
</footer>
<script src="./index.js"></script>
	<script src="/js/site-scripts.min.js?_=<?php echo time() ?>"></script>

</body>
</html>

