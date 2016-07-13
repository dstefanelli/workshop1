(function(){
	
	function Usuario( nameVal, surnameVal, emailVal, passVal ){
		this.name = nameVal;
		this.surname = surnameVal;
		this.email = emailVal;
		this.pass = passVal;
	}
	
	function removeErrors(){
		errors = document.getElementsByClassName("form-error");
		for(var i=0; i < errors.length; i++){
			errors[i].classList.remove("in");
		}
	}
	
	function addError( elemt, text ){
		error = elemt.nextElementSibling;
		error.classList.add("in");
		error.innerHTML = text;
	}
	
	function addSuccess( elemt ){
		error = elemt.nextElementSibling;
		error.classList.remove("in");
	}
	
	function isValidEmail( emailVal ){
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( emailVal );
		
	}
	
	function CheckPassword( passVal ){   
		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test( passVal ); 
	} 
	
	function getEmail( emailVal ){
		for(var i=0;i<localStorage.length;i++){
			var registro = JSON.parse(localStorage.getItem(localStorage.key(i)));
			console.log(registro);
			if(registro.email == emailVal){
				return true;
			}
			
		}
	}
	
	function getPass( passVal, emailVal ){
		for(var i=0;i<localStorage.length;i++){
			var user = JSON.parse(localStorage.getItem(localStorage.key(i)));
			
			if( user.pass == passVal && user.email == emailVal ){
				return true;
			}
		}
		return false;
	}
	
	var formRegistro = document.getElementsByName("formRegistro")[0];
	if( formRegistro != undefined ){
		formRegistro.onsubmit = function(){
			var name = document.getElementById('form-name'),
				nameVal = name.value,
				surname = document.getElementById('form-surname'),
				surnameVal = surname.value,
				email = document.getElementById('form-email'),
				emailVal = email.value,
				pass = document.getElementById('form-pass'),
				passVal = pass.value,
				pass2 = document.getElementById("form-pass2"),
				pass2Val = pass2.value,
				formReg = true;
			
			removeErrors();
			
			if(nameVal == ""){
				formReg = false;
				addError( name, "Debes completar tu nombre" );
			}else{
				addSuccess( name );
			}
			
			if(surnameVal == ""){
				formReg = false;
				addError( surname, "Debes completar tu apellido");
			}else{
				addSuccess( surname );
			}
			
			if(emailVal == ""){
				formReg = false;
				addError( email, "Debes completar tu email");
			}else if(!isValidEmail( emailVal )){
				formReg = false;
				addError( email, "El email debe ser valido @" );
			}else if( getEmail( emailVal )){
				formReg = false;
				addError( email, "Ese email ya está registrado" );
			}else{
				addSuccess( email );
			}
			
			if(passVal == ""){
				addError( pass, "Debes elegir una contraseña" );
				formReg = false;
			}else if(!CheckPassword( passVal )){
				formReg = false;
				addError( pass, "La contraseña debe tener mínimo 7 caracteres, mayúsculas, minúsculas y un número" );
			}else{
				addSuccess( pass );
			}
			
			if(pass2Val == ""){
				addError( pass2, "Debes repetir la contraseña" );
				formReg = false;
			}else if( pass2Val != passVal ){
				formReg = false;
				addError( pass2, "Las contraseñas deben coincidir" );
			}else{
				addSuccess( pass2 );
			}

			if( formReg ){
				var usuario = new Usuario( nameVal, surnameVal, emailVal, passVal );
				if( localStorage )
				{
					var key = "workshop"+Date.now();
					localStorage.setItem(( key ),JSON.stringify(usuario));

				}
				
				document.location.href = 'login.html';
			}

			return false;
		}
	}
	
	var formLogin = document.getElementsByName("formLogin")[0];
	if(formLogin != undefined ){
		formLogin.onsubmit = function(){
			var email = document.getElementById('form-login-email'),
				emailVal = email.value,
				pass = document.getElementById('form-login-pass'),
				passVal = pass.value,
				formLog = true;
			
			removeErrors();
			
			if(emailVal == ""){
				formLog = false;
				addError( email, "Debes ingresar tu email");
			}else if( getEmail( emailVal ) == false){
				formLog = false;
				addError( email, "El email no está registrado");
			}else{
				addSuccess( email );
			}
			
			if(passVal == ""){
				formLog = false;
				addError( pass, "Debes ingresar tu contraseña" );
			}else if( !getPass( passVal, emailVal )){
				formLog = false;
				addError( pass, "La contraseña no coincide" );
			}else{
				addSuccess( pass );
			}
			
			//userData( emailVal );
			
			if( formLog ){
				
				document.location.href = 'index.html';
			}
			
			return false;
		}
	}
	
	function userData( emailVal ){
		var bodyLogged = document.getElementsByClassName('logged')[0],
			userLogged = document.getElementsByClassName('user')[0],
			email = emailVal;

		for(var i=0;i<localStorage.length;i++){
			var usuario = JSON.parse(localStorage.getItem(localStorage.key(i)));

			if( usuario.email == email ){
				userLogged.children[1].innerHTML = usuario.name +" "+ usuario.surname;
			}
		}
	}	
	
})();