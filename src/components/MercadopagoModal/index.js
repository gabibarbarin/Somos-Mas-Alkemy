import React, { useState } from "react";
import { postService } from "../../services";
import { LoaderSpinner } from "../../components/index";

const MercadopagoModal = () => {
  const [amount, setAmount] = useState("default");
  const [donationLink, setDonationLink] = useState();
  const [loading, setLoading] = useState(false);

  const handleDonation = async e => {
    e.preventDefault();
    setLoading(true);
    const response = await postService("donations", { amount });
    setDonationLink(response.data.donationLink);
    setLoading(false);
  };

  const close = () => {
    setDonationLink();
    setAmount("default");
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-success'
        data-bs-toggle='modal'
        data-bs-target='#staticBackdrop'>
        Donar
      </button>

      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form onSubmit={e => handleDonation(e)}>
              <div className='modal-header'>
                <h5 className='modal-title' id='staticBackdropLabel'>
                  Ayudá Donando
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  onClick={close}></button>
              </div>
              <div className='modal-body'>
                <div className='row'>
                  <div className='col d-flex justify-content-center'>
                    <img
                      height='100px'
                      fluid="true"
                      src='./assets/mercadopago.svg'
                      alt='Mercadopago'
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='col p-2 '>
                    <p className='text-center'>
                      Con tu donación estas ayudando a muchas familias
                    </p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col p-2 '>
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      onChange={e => setAmount(e.target.value)}
                      value={amount}>
                      <option value='default'>
                        Seleccioná el monto a donar
                      </option>
                      <option value='1000'>1000</option>
                      <option value='2000'>2000</option>
                      <option value='3000'>3000</option>
                      <option value='4000'>4000</option>
                      <option value='5000'>5000</option>
                    </select>
                  </div>
                </div>
                {donationLink && (
                  <div>
                    <a
                      href={donationLink}
                      target='_blank'
                      className='text-primary'
                      style={{ fontSize: "1.05rem" }}>
                      Link de donación
                    </a>
                  </div>
                )}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={close}
                  data-bs-dismiss='modal'>
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='btn btn-success d-flex align-items-center'
                  disabled={donationLink}>
                  {loading ? "Generando" : "Generar"}
                  {loading && (
                    <div className='ms-2'>
                      <LoaderSpinner height='16px' width='16px' color='#fff' />
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MercadopagoModal;
