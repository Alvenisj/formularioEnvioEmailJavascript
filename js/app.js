
document.addEventListener('DOMContentLoaded', function( ) {

    //HABILITAR EL BOTÓN ENVIAR, UNA VEZ SE ENCUENTREN LOS CAMPOS: EMAIL, ASUNTO, MENSAJE, BIEN DILIGENCIADOS.
   // CON EL OBJETO INICIALIZADO VACIO, PODEMOS IR VERIFICANDO QUE LOS CAMPOS YA ESTÁN LISTOS PARA ENVIAR
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // SELECCIONAR LOS ELEMENTOS DE LA INTERFAZ
    const inputEmail = document.querySelector('#email');
    const inputCc = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const  btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');


    // ASIGNAR EVENTOS
    // con el blur, el evento se dispara cuando salimos del input hacia otro input
    // con el input, se tiene una experiencia real y el línea cuando el usuario llena el formulario
    inputEmail.addEventListener('input', validar );
    inputAsunto.addEventListener('input', validar );
    inputMensaje.addEventListener('input', validar );
    formulario.addEventListener('submit', enviarEmail );

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        // función que resetea el formulario
        resetFormulario();

    });

    function enviarEmail( e ) {
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        
        setTimeout( ( ) => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();
 
            //CREAR UNA ALERTA
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase' );
            alertaExito.textContent = 'Mensaje Enviado Correctamente';

            formulario.appendChild(alertaExito);

            setTimeout( ( ) => {
                alertaExito.remove();
            }, 3200 )

        }, 3000 );
    }


    function validar( e ) {

       if( e.target.value.trim() === '' ) {
            mostrarAlerta(`El campo ${e.target.id} es OBLIGATORIO`, e.target.parentElement );
            email[ e.target.name ] = '';
            comprobarEmail();
            return;   
       } 

       if( e.target.id === 'email' && !validarEmail( e.target.value ) ) {
            mostrarAlerta(`El Email "${e.target.value}" no es valido`, e.target.parentElement );
            email[ e.target.name ] = '';
            comprobarEmail();
            return;
       }

       limpiarAlerta( e.target.parentElement );
       //ASIGNAR LOS VALORES AL OBJETO EMAIL
       email[ e.target.name ] = e.target.value.trim().toLowerCase();
       // COMPROBAR EL OBJETO EMAIL
       comprobarEmail();
    }

    function mostrarAlerta( msg, referencia ) { 
        //FUNCIÓN QUE LIMPIA LAS ALERTAS 
            limpiarAlerta( referencia );

            //GENERAR ALERTA EN HTML
            const error = document.createElement('P');
            error.textContent = msg;
            error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'rounded-lg')

            // AGREGAR EL ERROR EN EL FORMULARIO
            // appendChild ---> agrega un nuevo elemento al html ya existente.
            referencia.appendChild(error);

    }


    function limpiarAlerta( referencia ) {
         const alerta = referencia.querySelector('.bg-red-600');       
            if( alerta ) {
                alerta.remove();
            }
    }


    function validarEmail( email ) {
        // EXPRESIÓN REGULAR QUE VALIDA UN CAMPO DE CORREO ELECTRÓNICO EN EL FORMULARIO
        // EL PATRÓN ES: usuario@dominio.com
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const result = regex.test(email); // retorna true o false
        return  result;
      
    }


    function comprobarEmail( ) {

       if( Object.values(email).includes('') ) {
            // SE CUMPLE ESTA CONDICIÓN CUANDO AL MENOS UN CAMPO ESTE VACIO
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
       } 
            // SE CUMPLE ESTA CONDICIÓN CUANDO TODOS LOS CAMPOS ESTÁN LLENOS
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
            
       
     }


     function resetFormulario( ) {

        // REINICIAR EL OBJETO
            email.email = '';
            email.asunto = '';
            email.mensaje = '';

            formulario.reset();
            comprobarEmail();
     }


});







