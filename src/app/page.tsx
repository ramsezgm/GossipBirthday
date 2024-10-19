"use client";

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaMapMarkerAlt, FaFilePdf } from "react-icons/fa";

interface CarouselItem {
  image: string;
  description: string;
}

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    attendance: 'yes',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const items: CarouselItem[] = [
    { image: '/ale6.jpg', description: 'Sixth image' },
    { image: '/ale3.jpg', description: 'Third image' },
    { image: '/ale2.jpg', description: 'Second image' },
    { image: '/ale5.jpg', description: 'Fifth image' },
    { image: '/ale4.jpg', description: 'Fourth image' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/add-person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('¡Los datos se enviaron correctamente!');
        setFormData({ firstName: '', lastName: '', attendance: 'yes' });  // Limpiar formulario después del envío
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage('Ocurrió un error al enviar el formulario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Sección con imagen de fondo */}
      <div
        className="relative flex flex-col justify-center items-center h-[50vh] w-full"
        style={{
          backgroundImage: "url('/cityhd-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <h1 className="text-5xl sm:text-7xl md:text-7xl gossip-title relative z-10 pt-10 sm:pt-20">
          gossip girl
        </h1>
        <nav className="py-5 sm:py-10 flex justify-evenly w-full text-md sm:text-lg md:text-xl text-white relative z-10 nav-bright">
          <a href="#home" className="hover:text-gray-400">Home</a>
          <a href="#pics" className="hover:text-gray-400">Pics</a>
          <a href="#party" className="hover:text-gray-400">Party</a>
        </nav>
      </div>

      {/* Sección Home */}
      <section id="home" className="relative p-8 sm:p-12 md:p-24 space-y-12 lg:space-y-0 flex flex-col lg:flex-row justify-center items-center min-h-screen bg-black smoke-effect">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-100 to-black opacity-10 pointer-events-none animate-smoke"></div>
        
        {/* Contenedor centrado */}
        <div className="flex flex-col lg:flex-row justify-center items-center max-w-screen-xl mx-auto">
          
          {/* Imagen */}
          <div className="relative flex w-full lg:w-2/3 md:w-full sm:w-full justify-center items-center">
            <img src="ale1.jpg" alt="Image description" className="rounded-3xl shadow-lg w-full lg:w-4/5 md:w-full" />
          </div>

          {/* Texto con tamaño más ajustado */}
          <div className="flex flex-col w-full lg:w-1/2 mt-12 lg:mt-0 lg:ml-12 justify-center items-center lg:items-start text-center lg:text-left">
            <h2 className="text-5xl sm:text-6xl lg:text-6xl mb-6 lg:mb-10 text-outlined">Happy Birthday, A!</h2>
            <div className="bg-white p-5 sm:p-8 rounded-lg shadow-lg max-w-full lg:max-w-full">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-lg mb-6 sm:mb-8 text-black text-justify lg:text-left">
                "Spotted! A spectacular party is approaching. Gossip Girl here, your one and only source into the scandalous lives of Panama's elite. The secret’s out, and it's a big one! A’s 21st birthday bash is said to be at... Stay tuned, darlings."
              </p>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl mt-6 sm:mt-8 text-outlined">XOXO, Gossip Girl</p>
          </div>

        </div>
      </section>

      {/* Sección Pics replicada */}
      <section id="pics" className="relative p-5 sm:p-10 md:p-20 space-y-8 flex flex-col justify-center items-center min-h-screen bg-black smoke-effect">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-100 to-black opacity-10 pointer-events-none animate-smoke"></div>

  {/* Slider con las imágenes */}
  <div className="w-full sm:w-2/3 md:w-2/3 mx-auto">
    <Slider {...settings} className="rounded shadow w-full">
      {items.map((item, index) => (
        <div key={index} className="relative flex justify-center group px-2">
          <img
            src={item.image}
            alt={item.description}
            className="w-full h-auto object-contain rounded-3xl shadow-lg"
            loading="lazy"
          />
        </div>
      ))}
    </Slider>
  </div>

  {/* Texto debajo de las imágenes */}
  <div className="flex flex-col w-full sm:w-2/3 md:w-1/2 mt-8 mx-auto">
    <div className="bg-white p-5 sm:p-10 rounded-lg shadow-lg max-w-full sm:max-w-2xl mx-auto">
      <p className="text-md sm:text-lg md:text-2xl sm:mb-6 text-black text-justify">
        "Spotted at A's exclusive 21st birthday bash! The night is still young, but the gossip is already hotter than ever. Lights, cameras, and whispers all around. Stay tuned, darlings, because the real fun is just getting started."
      </p>
    </div>
  </div>
</section>

      {/* Sección Party con Formulario */}
      <section
        id="party"
        className="relative p-5 sm:p-10 min-h-screen bg-black smoke-effect flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-100 to-black opacity-10 pointer-events-none animate-smoke"></div>

        <div className="flex flex-col mb-36 sm:flex-row items-center sm:space-x-10 z-10 w-full max-w-6xl">
          {/* Imagen de Gossip Girl */}
          <div className="hidden sm:block w-full sm:w-1/2">
            <img src="/collage1.jpg" alt="Gossip Girl" className="rounded-3xl shadow-lg w-3/4 object-cover" />
          </div>

          {/* Formulario estilo login */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-1/2">
            <h2 className="text-3xl font-bold text-center text-black mb-6">Attendance!</h2>
            <p className="text-md sm:text-lg text-justify text-black mb-6">
              The secret's out and you're invited to A's exclusive birthday party!
            </p>
            <form onSubmit={handleSubmit}>
              {/* Nombre */}
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700" htmlFor="first-name">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full p-3 border rounded-md shadow-sm bg-gray-50 text-gray-800 focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Apellido */}
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full p-3 border rounded-md shadow-sm bg-gray-50 text-gray-800 focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Asistencia */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700" htmlFor="attendance">
                  Will you attend?
                </label>
                <select
                  id="attendance"
                  className="w-full p-3 border rounded-md shadow-sm bg-gray-50 text-gray-800 focus:ring-yellow-400 focus:border-yellow-400"
                  value={formData.attendance}
                  onChange={handleChange}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Botón Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full p-3 bg-yellow-300 text-black font-bold rounded-md hover:bg-yellow-400"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              {/* Mostrar mensaje de éxito o error */}
              {message && (
                <div
                  className={`mt-4 p-4 rounded-lg text-lg text-center font-bold ${
                    message.includes('Error') ? 'bg-red-500 text-white' : 'bg-green-400 text-black'
                  }`}
                >
                  {message.includes('Error') ? (
                    <p>Oops! Something went wrong. Please try again.</p>
                  ) : (
                    <p>🎉 Your RSVP has been confirmed! We're so excited to see you at the party! XOXO, Gossip Girl 💋</p>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Información adicional: Hora y lugar */}
        <div className="absolute bottom-10 lg: right-10 bg-transparent text-white font-bold text-lg sm: left-10 text-center animate-glow">
          <p className="px-4 py-2 rounded-lg gossip-title text-2xl">October 27, 2024 | 5:00 PM | Cielo Rooftop Bar</p>
        </div>
      </section>

      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-5 sm:px-10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-8 sm:space-y-0">
            {/* Columna 1: Menú PDF */}
            <div className="text-center sm:text-left">
              <a
                href="/cielo_menu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start text-yellow-300 hover:text-yellow-500"
              >
                <FaFilePdf className="mr-2 text-2xl" />
                <span className="text-lg font-bold">Download Menu</span>
              </a>
            </div>

            {/* Columna 2: Logo */}
            <div className="text-center">
              <h2 className="text-3xl font-bold italic gossip-title">gossip girl</h2>
              <p className="text-sm text-gray-400 italic mt-2">
                XOXO, see you at the party!
              </p>
            </div>

            {/* Columna 3: Mapa de Google */}
            <div className="text-center sm:text-right">
              <a
                href="https://maps.app.goo.gl/9RtnXcJrj6Ro4Nqt9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-end text-yellow-300 hover:text-yellow-500"
              >
                <FaMapMarkerAlt className="mr-2 text-2xl" />
                <span className="text-lg font-bold">Find Us Here</span>
              </a>
            </div>
          </div>

          {/* Línea divisora */}
          <div className="mt-8 border-t border-gray-700"></div>

          {/* Información adicional */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Gossip Girl Party | All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
