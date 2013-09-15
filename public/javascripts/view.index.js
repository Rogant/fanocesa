(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-43613058-1', 'fanaticocesacolombia.com');
ga('send', 'pageview');

$(function() {

	$(document).ready(function(){
		$('.fechaN').datepicker();
	});


	//var socket = io.connect('http://localhost:3000');
	var socket = io.connect('http://www.fanaticocesacolombia.com:3000');
	
	socket.on('ranking', function(data){
		console.log(data);
	});

	socket.on('mensaje', function(data){
		console.log(data.mensaje);
	});

	socket.on('newTweet', function(data){
		$('#tweets').prepend('<li class="tweet"><div class="s0"><span>'+data.nombre+' <small>@'+data.user+'</small></span></div><div class="s1"><img src="'+ data.img +'"></div><div class="s2"><p>'+ data.tweet +'</p></div></li>');
	});

	$( "#openReg" ).click(function() {
		$.fancybox.open({
			width   : 300,
			height    : 244,
			autoSize  : true,
			autoResize : true,
			closeClick  : false,
			autoCenter: true,
			fitToView : true,
			openEffect  : 'none',
			closeEffect : 'none',
			type: 'inline',
			href: '#formRegistro'
		});
	});

	$('#registro').submit(function() {
		$.ajax({
			url     : $(this).attr('action'),
			type    : 'post',
			data    : $(this).serialize(),
			success : function( data ) {
				alert('Registro Exitoso');
				$.fancybox.close(true);
			},
			error   : function( xhr, err ) {
				alert('Error');
				console.log(err);
				console.log(xhr);
			}
		});
		return false;
	});
});