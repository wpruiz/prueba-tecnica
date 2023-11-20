import { NextPage } from "next";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <main
      className={`flex min-h-screen justify-center px-6 my-8 mx-auto md:px-24`}
    >
      <div className="flex flex-col justify-between max-w-[1024px] ">
        <h1 className="mb-8 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-sky-400">Prueba Técnica</span> - Desarrollador Frontend</h1>
        <p className="mb-2">
          El principal enfoque del proyecto fue demostrar habilidades de
          desarrollo frontend siguiendo las mejores prácticas. Se hizo especial
          énfasis en la interacción con APIs externas, la optimización del
          rendimiento, la implementación de funcionalidades avanzadas y la
          creación de una interfaz de usuario atractiva y funcional. El proyecto
          no solo abordó la funcionalidad básica requerida, como mostrar una lista
          de publicaciones, sino que también incluyó funcionalidades avanzadas
          como la edición, eliminación, paginación dinámica, búsqueda y
          almacenamiento local para nuevas publicaciones, asegurando una
          experiencia completa para el usuario.
        </p>
        <h2 className="text-2xl lg:text-4xl font-extrabold my-5 md:my-10">Herramientas Utilizadas</h2>
        <p className="my-2">
          <strong className="text-lg">Next.js:</strong> Elegí Next.js debido a su facilidad para construir aplicaciones
          web modernas con React, proporcionando capacidades como renderizado del
          lado del servidor (SSR) y generación de sitios estáticos (SSG).
        </p>
        <p className="my-2">
          <strong className="text-lg">TypeScript:</strong> Utilicé TypeScript para obtener tipado estático y mejorar la
          robustez del código, reduciendo errores durante el desarrollo.
        </p>
        <h2 className="text-2xl lg:text-4xl font-extrabold my-5 md:my-10">Bibliotecas y APIs:</h2>
        <p>
          JSONPlaceholder API: Para obtener datos de prueba de publicaciones,
          comentarios, usuarios, etc.
        </p>
        <p>
          Tailwind CSS: Empleé Tailwind CSS para estilizar la aplicación,
          aprovechando sus utilidades de diseño predefinidas para un desarrollo
          más rápido y consistente.
        </p>
        <div className="flex justify-center my-10">
          <Link className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" href="/listado">Ir al listado</Link>
        </div>

      </div>
    </main>
  );
};

export default HomePage;
