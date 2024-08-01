let pag = 1
const btnAntes = document.getElementById("btnAntes")
const btnDespues = document.getElementById("btnDespues")



document.getElementById("numeroDePagina").innerHTML=pag 

btnDespues.addEventListener("click",function(){
    if (pag<500){
        pag++
        document.getElementById("numeroDePagina").innerHTML=pag 
        mostrarPeliculas()
    }else{
        alert("ᓚᘏᗢ  - Es la ultima pagina  -  ᓚᘏᗢ")
    }
    
})

btnAntes.addEventListener("click",function(){
    if (pag>1){
        pag--
        document.getElementById("numeroDePagina").innerHTML=pag 
        mostrarPeliculas()
    }
})

const mostrarPeliculas = async function () {
    var urlLink = `https://api.themoviedb.org/3/movie/popular?api_key=69776d98d3f8da6dcc01c3d5b234f72b&language=en&page=${pag}`
    try {
        const respuesta = await fetch(urlLink);

        if (!respuesta.ok) {
            throw new Error(`Network response was not ok ` + respuesta.statusText)
        }
        const datos = await respuesta.json()
        listaPeliculas = datos.results
        let peliculas=""
        for (const pelicula of listaPeliculas) {
            peliculas+=`
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}.jpg">
                <h3 class="titulo">${pelicula.title}</h3>
            </div>
            `;
        }
        document.getElementById("contenedor").innerHTML = peliculas

    } catch (error) {
        console.error("Hubo un problema con la solicitud: " + error)
    }
}

mostrarPeliculas()