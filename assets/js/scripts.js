$(document).ready(function(){

	setTimeout(function(){
		$('#loader').css('display','none');
		$('.header,.footer').show();
		// if not logged in go to login page.
		if(logged){
			console.log('logged in')
		}else{
			$.ajax({url:'pages/login.html', success: function(res){
				$('body').prepend(res);
				$('.header,.main,.footer').hide();
			}});
		}
	},5000);

	$.ajax({url:'pages/home.txt',success: function(result){
		$('#main').html(result);
		$('#main').addClass('home');
	}});


	$.ajax({url:'pages/item.txt',success: function(data){
		for(i = 0;i<3;i++){
			$('#recent').append(data);
			$('#new').append(data);

			$('#recent .item img').attr('src', "assets/imgs/LimeHearted/" + imgs.babies[i]);
			$('#new .item img').attr('src', "assets/imgs/LimeHearted/" + imgs.new[i]);
			console.log('posted');
		}
	}});

	$('#submit__login').on("click",function(){
		let uemail = $('#email').val();
		let upass = $('#password').val();
		let logCred = {name: uemail, password: upass};
		let credJSON = JSON.stringify(logCred);
		localStorage.setItem("login credentials",credJSON);
	})

	$('#login .signup').on('click',function(){
		$.ajax({url:'pages/sign_up.html',success: function(data){
			$('#login').remove();
			$('body').prepend(data);
		}})
	})


	// $('.footer').css('bottom','0');
});

let logged = true;

if ("serviceWorker" in navigator){
	window.addEventListener("load", function(){
		navigator.serviceWorker.register("service-worker.js")
			.then(res => console.log("Service Worker registered"))
			.catch(err => console.log("service worker not registered", err))
	})
}

(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
			FB.init({
				appId      : '{your-app-id}',
				cookie     : true,
				xfbml      : true,
				version    : '{api-version}'
			});
			
			FB.AppEvents.logPageView();   
			
		};




FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});

FB.login(function(response) {
  // handle the response
  if (response.status === 'connected') {
    // Logged into your webpage and Facebook.
    logged = true;
  } else {
    // The person is not logged into your webpage or we are unable to tell.
    logged = false; 
  }
}, {scope: 'public_profile,email'});

/*{
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}*/

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });


