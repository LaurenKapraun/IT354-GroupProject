<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package IT354
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	
	<script type="text/javascript" src="/wp-content/themes/it354/js/it354.js"></script>
	<script type="text/javascript" src="/wp-content/themes/it354/js/otherit354.js"></script>
	
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body <?php body_class(); ?>>
	<?php if ( is_front_page() ) : ?>
	<style>
		#page { 
			margin: 0;
			height: 100%;
		}
	</style>
	<?php endif; ?>
	
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'it354' ); ?></a>

	<?php if ( is_front_page() ) : ?>
		<header id="masthead" class="site-header masthead-home">
	<?php else : ?>
		<header id="masthead" class="site-header">
	<?php endif; ?>
		<div class="max-screen-size">
			<div class="site-branding">
				<?php
				the_custom_logo();
				if ( is_front_page() ) :
					?>
					<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
					<?php
				else :
					?>
					<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
					<?php endif; ?>
			</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation">
				<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'it354' ); ?></button>
				<?php
				wp_nav_menu( array(
					'theme_location' => 'menu-1',
					'menu_id'        => 'primary-menu',
				) );
				?>
			</nav><!-- #site-navigation -->
		</div>
		<?php if ( is_front_page() ) : ?>
			<div class="header_search max-screen-size">
				<h2>Search By...</h2>
				<div class="tab">
					<button class="tablinks" onclick="openSearch(event, 'Location')" id="defaultOpen">Location</button>
					<button class="tablinks" onclick="openSearch(event, 'Name')">Name</button>
				</div>
				
				<div id="Location" class="tabcontent">
					<div class="search-container">
						<input type="text" id="locationInput" placeholder="Location..." name="search">
						<button onclick="myFunction('location')"><i class="fa fa-search"></i></button>
					</div>
				</div>
				
				<div id="Name" class="tabcontent">
					<div class="search-container">
						<input type="text" id="nameInput" placeholder="Business Name..." name="search">
						<button onclick="myFunction('name')"><i class="fa fa-search"></i></button>
					</div>
				</div>
				
				<script>
					function openSearch(evt, searchType) {
						var i, tabcontent, tablinks;
						tabcontent = document.getElementsByClassName("tabcontent");
						for (i = 0; i < tabcontent.length; i++) {
							tabcontent[i].style.display = "none";
						}
						tablinks = document.getElementsByClassName("tablinks");
						for (i = 0; i < tablinks.length; i++) {
							tablinks[i].className = tablinks[i].className.replace(" active", "");
						}
						document.getElementById(searchType).style.display = "block";
						evt.currentTarget.className += " active";
					}

					document.getElementById("defaultOpen").click();
				</script>
			</div>
		<?php endif; ?>
	</header><!-- #masthead -->
	
	<div id="content" class="site-content">
