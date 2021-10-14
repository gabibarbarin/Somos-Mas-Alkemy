import React, { useEffect, useState } from "react";
import {
  HiLocationMarker,
  HiPhone,
  HiMail,
  FaInstagram,
  FaFacebookSquare,
} from "../../icons";
import { Link } from "react-router-dom";
import "./style.css";
import { getAllService } from "../../services";

const Footer = () => {
  const [organizationData, setOrganizationData] = useState(null);

  useEffect(() => {
    getAllService("/organizations/1/public").then(({ data }) => {
      setOrganizationData({
        name: data.name,
        logo: data.image,
        phone: data.phone,
        address: data.address,
        social: data.SocialNetworks,
      });
    });
  }, []);

  return (
    <footer className='shadow-md'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 col-lg-5 mb-3 mb-lg-0'>
            <div className='row'>
              <div className='col-md-12 col-lg-8 mb-md-0 mb-3'>
                <Link to='/' href='#' className='footer-logo'>
                  {/*//! REVISAR: la URL de la imagen no esta subida correctamente y por ende no se puede mostrar al traerla del endpoint  */}
                  {/* <img src={organizationData?.logo} alt='logo' /> */}
                  <img src='./assets/logo.png' alt='logo' />
                </Link>
                <div className='footer-contact'>
                  <div className='contact-item'>
                    <HiLocationMarker />
                    <p className='m-0'>{organizationData?.address}</p>
                  </div>
                  <div className='contact-item'>
                    <HiPhone />
                    <p className='m-0'>{organizationData?.phone}</p>
                  </div>
                  <div className='contact-item'>
                    <HiMail />
                    {/* //! REVISAR: el mail de la empresa no es devuelto por el endpoint */}
                    <p className='m-0'>somosfundacionmas@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-8 col-lg-7'>
            <div className='row'>
              <div className='col-md-5 mb-md-0 mb-3 b-left ps-4'>
                <h2 className='footer-heading'>Secciones</h2>
                <ul className='list-unstyled mt-3'>
                  <li className='footer-section-item'>
                    <Link to='/testimonials' className='py-1 d-block'>
                      Testimonios
                    </Link>
                  </li>
                  <li className='footer-section-item'>
                    <Link to='/us' className='py-1 d-block'>
                      Nosotros
                    </Link>
                  </li>
                  <li className='footer-section-item'>
                    <Link to='/services' className='py-1 d-block'>
                      Servicios
                    </Link>
                  </li>
                  <li className='footer-section-item'>
                    <Link to='/donations' className='py-1 d-block'>
                      Donaciones
                    </Link>
                  </li>
                  <li className='footer-section-item'>
                    <Link to='/content' className='py-1 d-block'>
                      Contenido
                    </Link>
                  </li>
                  <li className='footer-section-item'>
                    <Link to='/contacto' className='py-1 d-block'>
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='col-md-5 mb-md-0 mb-1 b-left ps-4'>
                <h2 className='footer-heading'>Social</h2>
                <ul className='list-unstyled mt-3'>
                  {organizationData?.social.map((item, index) => {
                    const Icon = {
                      Facebook: FaFacebookSquare,
                      Instagram: FaInstagram,
                    }[item.description];

                    return (
                      <li className='footer-section-item' key={index}>
                        <Icon />
                        <a href='#' className='py-1 d-block'>
                          {item.value}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bottom-footer mt-0 mt-md-4'>
        <div className='container'>
          <div className='row bottom-footer-content'>
            <div className='col-md-6 col-lg-8 w-100 d-flex justify-content-center'>
              &copy; {new Date().getFullYear()} Somos Más. Todos los derechos
              reservados
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
