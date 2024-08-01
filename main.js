let pag = 1
const btnAntes = document.getElementById("btnAntes")
const btnDespues = document.getElementById("btnDespues")

btnDespues.addEventListener("click",function(){
    if (pag<1000){
        pag++
        mostrarPeliculas()
    }
})

btnAntes.addEventListener("click",function(){
    if (pag>1){
        pag--
        mostrarPeliculas()
    }
})

const mostrarPeliculas = async function () {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=69776d98d3f8da6dcc01c3d5b234f72b&language=en&page=${pag}`);

        if (!respuesta.ok) {
            throw new Error(`Network response was not ok ` + respuesta.statusText)
        }
        const datos = await respuesta.json()
        listaPeliculas = datos.results
        console.log(listaPeliculas)
        let peliculas=""
        for (const pelicula of listaPeliculas) {
            peliculas+=`
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}.jpg">
            </div>
            <h1>${pelicula.title}</h1>
            `;
        }
        document.getElementById("contenedor").innerHTML = peliculas




    } catch (error) {
        console.error("Hubo un problema con la solicitud: " + error)
    }
}

mostrarPeliculas()