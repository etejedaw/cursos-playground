let getUserByID = (id, callback) => {
    let usuario = {
        nombre: "Esteban",
        id
    }
    if(id == 20) callback(`El usuario con ID ${id} no existe en la DB`)
    else callback(null, usuario);
}

getUserByID(1, (err, usuario)=>{
    if(err) return console.log(err);
    console.log("Usuario de base de datos: ", usuario);
});