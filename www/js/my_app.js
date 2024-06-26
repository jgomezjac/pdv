if (/Mobi/.test(navigator.userAgent)  || /Android/i.test(navigator.userAgent) ) {
	document.addEventListener("backbutton", onBackKeyDown, false);
	function onBackKeyDown(e) {
	  e.preventDefault();
	}
} else {
	// Es web, espero que cargue la pagina y ya lo habilito
}

let mLogin= new LoginClass();
mLogin.setNombreApp('cousa');
mLogin.setUrlServicios( retornarUrlServicios() );

let mMenu = new MenuClass();

let animateApp	= angular.module('animateApp', ['ngRoute', 'ngAnimate']);
animateApp.config(function($routeProvider) {
	$routeProvider
	// login
	.when('/', {
		cache: false,
		disableCache: true,
		templateUrl: 'login.html?'+$.now(),
		controller: 'loginController'
	})
	.when('/login', {
		cache: false,
		disableCache: true,
		templateUrl: 'login.html?'+$.now(),
		controller: 'loginController'
	})
	.when('/error', {
		templateUrl: 'error.html',
		controller: 'errorController'
	})
	.when('/menu', {
		cache: false,
		disableCache: true,
		templateUrl: 'menu.html?'+$.now(),
		controller: 'menuController'
	})
	.when('/misVisitas', {
		cache: false,
		disableCache: true,
		templateUrl: 'misVisitas.html?'+$.now(),
		controller: 'misVisitasController'
	})
	.when('/registrarVisita', {
		cache: false,
		disableCache: true,
		templateUrl: 'registrarVisita.html?'+$.now(),
		controller: 'registrarVisitaController'
	})

});

animateApp.controller('menuController', function($scope) {
	$scope.pageClass = 'page-menu';
	if(mMenu == null) {
		mMenu = new MenuClass();
	} 
})
animateApp.controller('registrarVisitaController', function($scope) {
	$scope.pageClass = 'page-visita';
})
animateApp.controller('misVisitasController', function($scope) {
	$scope.pageClass = 'page-misvisitas';
})
animateApp.controller('loginController', function($scope) {
	$scope.pageClass = 'page-login';
})