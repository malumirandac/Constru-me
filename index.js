document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const modalContent = document.getElementById('modalContent');
    const confirmButton = document.getElementById('confirmButton');

    let users = [];

    /* funcion calculo edad */
    const esMayor = (birthDate, joinDate) => {
        const birthYear = new Date(birthDate).getFullYear();
        const joinYear = new Date(joinDate).getFullYear();
        return (joinYear - birthYear) >= 18;
    };

    /* funcion correo unico */
    const correoUnico = (email) => {
        return !users.some(user => user.correo === email);
    };

    /* Manejador de submit */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const correo = document.getElementById('correo').value.trim();
        const cargo = document.getElementById('cargo').value;
        const fechaIngreso = document.getElementById('fechaIngreso').value;

        //Validacion mayor edad
        if (!esMayor(fechaNacimiento, fechaIngreso)){
            alert('El trabajador debe ser mayor de edad para ingresar');
            return;
        }

        //Validacion correo unico
        if (!correoUnico(correo)){
            alert('El correo ya está registrado con un usuario');
            return;
        }

        //modal con datos
        modalContent.innerHTML = `
            <strong>Nombre:</strong> ${nombre}<br>
            <strong>Apellido:</strong> ${apellido}<br>
            <strong>Fecha de Nacimiento:</strong> ${fechaNacimiento}<br>
            <strong>Correo Electrónico:</strong> ${correo}<br>
            <strong>Cargo:</strong> ${cargo}<br>
            <strong>Fecha de Ingreso:</strong> ${fechaIngreso}
        `;

        //modal confirmacion
        const confirmacionModal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
        confirmacionModal.show();

        //manejo configuracion del modal
        confirmButton.onclick = () =>{
            users.push({nombre, apellido, fechaNacimiento, correo, cargo, fechaIngreso});
            addUserToList({nombre, apellido, correo, cargo, fechaIngreso});
            confirmacionModal.hide();
            form.reset();
        };
    });

    //funcion agregar usuarios a la lista
    const addUserToList = (user) => {
        const userItem = document.createElement('div');
        userItem.classList.add('col-12', 'col-md-6', 'col-lg-3', 'mb-4');
        userItem.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${user.nombre} ${user.apellido}</h5>
                    <p class="card-text"><strong>Correo Electrónico:</strong> ${user.correo}</p>
                    <p class="card-text"><strong>Cargo:</strong> ${user.cargo}</p>
                    <p class="card-text"><strong>Fecha de Ingreso:</strong> ${user.fechaIngreso}</p>
                    <button class="btn btn-danger btn-sm mt-2">Eliminar</button>
        `;
        userItem.querySelector('button').addEventListener('click', () => {
            userList.removeChild(userItem);
            users = users.filter(u => u.correo !== user.correo);
        });
        userList.appendChild(userItem);
    };

});