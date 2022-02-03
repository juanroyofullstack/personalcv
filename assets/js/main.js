/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
const btnForm = document.querySelector('.primary')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const subject = document.querySelector('#subject')
const message = document.querySelector('#message')
const enviarForm = document.querySelector('form')

//eventListeners()
//function eventListeners() {
	name.addEventListener('blur', validarFormulario)
    email.addEventListener('blur', validarFormulario)
    subject.addEventListener('blur', validarFormulario)
    message.addEventListener('blur', validarFormulario)
	
//}
const mensajes = {}
function validarFormulario (e) {
	if(e.target.id == 'name' && e.target.value.length > 0) {
		const error = this.parentElement.querySelector('p');
		console.log(e.target.id,this.parentElement.querySelector('p'))
		if(error) {
			error.remove();
		}
	} else if(e.target.id == 'name' && e.target.value.length === 0) {
		mostrarError.bind(this)('debes rellenar el nombre')
	}
	if(e.target.id == 'subject' && e.target.value.length > 0) {
		console.log(e.target.id)
	} else if(e.target.id == 'subject' && e.target.value.length === 0){
		mostrarError.bind(this)('debes rellenar el subject')

	}
	if(e.target.id == 'message' && e.target.value.length > 0) {
		console.log(e.target.id)
	} else if(e.target.id == 'message' && e.target.value.length === 0) {
		mostrarError.bind(this)('debes rellenar el message')
	}
	const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if(e.target.id === 'email') {
			console.log(re.test(e.target.value))
		if(re.test(e.target.value)) {
			console.log('todo cabron')
		} else {
			console.log(' no cabron')
		}
	}
	

}
function mostrarError (mensaje) {
	const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje;
	this.parentElement.appendChild(mensajeError)
}
function enviarEmail() {
	
}


(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',  '1280px' ],
			medium:   [ '737px',   '1024px' ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

	// Header Panel.

		// Nav.
			var $nav_a = $nav.find('a');

			$nav_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$nav_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '5vh',
							bottom: '5vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($nav_a.filter('.active-locked').length == 0) {

										$nav_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		// Title Bar.
			$titleBar = $(
				'<div id="titleBar">' +
					'<a href="#header" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$header
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'header-visible'
				});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				if (breakpoints.active('<=medium'))
					return $titleBar.height();

				return 0;

			}
		});

})(jQuery);

